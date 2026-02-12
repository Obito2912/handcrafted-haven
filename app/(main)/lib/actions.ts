"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema, AuthFormState } from "./schemas/authSchemas";
import { ProfileSchema, ProfileFormState } from "./schemas/profileSchemas";
import {
  CreateProductSchema,
  ProductFormState,
  ProductSchema,
  UpdateProductSchema,
} from "./schemas/productSchema";
import { pinata } from "@/components/utils/pinataConfig";
import { ProductRating, RateProductResult } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function handleAuth(
  prevState: AuthFormState | undefined,
  formData: FormData,
) {
  console.log("handleAuth called");
  console.log("Form data:", Object.fromEntries(formData));

  const mode = formData.get("mode");
  console.log("Mode:", mode);

  if (mode === "signup") {
    return await createUserProfile(prevState, formData);
  } else {
    return await authenticate(formData);
  }
}
async function createUserProfile(
  prevState: AuthFormState | undefined,
  formData: FormData,
) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.prettifyError(validatedFields.error),
      message: z.prettifyError(validatedFields.error),
      values: {
        name: formData.get("name")?.toString(),
        email: formData.get("email")?.toString(),
        // Don't include password for security
      },
    };
  }

  const { name, email, password } = validatedFields.data;
  const passwordHash = await bcrypt.hash(password, 10);
  const date = new Date().toISOString().split("T")[0];
  try {
    const [user] = await sql`
            INSERT INTO users (email, password_hash, created_at)
            VALUES (${email}, ${passwordHash}, ${date})
            RETURNING id
        `;

    await sql`
            INSERT INTO user_profiles (user_id, name, created_at)
            VALUES (${user.id}, ${name}, ${date})
        `;
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "Error creating user. Please try again.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}

async function authenticate(formData: FormData) {
  console.log("authenticate called");
  try {
    await signIn("credentials", formData, { redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }

    // Let NEXT_REDIRECT and other framework errors propagate so redirects work
    throw error;
  }
}

export async function updateUserProfile(
  prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const validatedFields = ProfileSchema.safeParse({
    user_id: formData.get("user_id")?.toString(),
    name: formData.get("name"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    bio: formData.get("bio"),
    image_url: formData.get("image_url"),
    user_type: formData.get("user_type"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.prettifyError(validatedFields.error),
      message: z.prettifyError(validatedFields.error),
      success: false,
      values: {
        user_id: formData.get("user_id")?.toString(),
        name: formData.get("name")?.toString(),
        age: formData.get("age")?.toString(),
        gender: formData.get("gender")?.toString(),
        bio: formData.get("bio")?.toString(),
        image_url: formData.get("image_url")?.toString(),
        user_type: formData.get("user_type")?.toString(),
      },
    };
  }

  const { user_id, name, age, gender, bio, image_url, user_type } =
    validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  console.log("UPDATE values:", {
    user_id,
    name,
    age,
    gender,
    bio,
    image_url,
    user_type,
    date,
  });
  try {
    await sql`
            UPDATE user_profiles 
            SET
                name = ${name},
                age = ${age},
                gender = ${gender},
                bio = ${bio},
                image_url = ${image_url},
                user_type = ${user_type}
            WHERE user_id = ${user_id}
        `;
    revalidatePath("/(main)", "layout");
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      message: "Error updating user. Please try again.",
      success: false,
    };
  }

  return {
    message: "Profile updated successfully.",
    success: true,
    values: {
      user_id: formData.get("user_id")?.toString(),
      name: formData.get("name")?.toString(),
      age: formData.get("age")?.toString(),
      gender: formData.get("gender")?.toString(),
      bio: formData.get("bio")?.toString(),
      image_url: formData.get("image_url")?.toString(),
      user_type: formData.get("user_type")?.toString(),
    },
  };
}

export async function createProduct(
  prevState: ProductFormState | undefined,
  formData: FormData,
): Promise<ProductFormState> {
  console.log("createProduct called with:", {
    product_id: formData.get("product_id")?.toString(),
    title: formData.get("title"),
    description: formData.get("description"),
    //image_url: formData.get(),
    userId: formData.get("user_id")?.toString(),
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : undefined,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    category: formData.get("category"),
  });

  const imageFile = formData.get("image_file") as File | null;
  let imageUrl = "";
  console.log("Received image file:", imageFile);
  if (imageFile) {
    try {
      const uploadResult = await uploadImageToPinata(imageFile);
      console.log("Image uploaded to Pinata:", uploadResult);
      imageUrl = uploadResult;
    } catch (error) {
      console.log("Error uploading image:", error);
      return {
        errors: "Error uploading image. Please try again.",
        message: "Error uploading image. Please try again.",
        values: {
          title: formData.get("title")?.toString(),
          description: formData.get("description")?.toString(),
          image_url: "test.jpg", //formData.get("image_url")?.toString(),
          userId: formData.get("user_id")?.toString(),
          quantity: formData.get("quantity")?.toString(),
          price: formData.get("price")?.toString(),
          category: formData.get("category")?.toString(),
        },
      };
    }
  }
  const validatedFields = CreateProductSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image_url: imageUrl,
    userId: formData.get("user_id")?.toString(),
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : undefined,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    category: formData.get("category"),
  });
  if (!validatedFields.success) {
    return {
      errors: z.prettifyError(validatedFields.error),
      message: z.prettifyError(validatedFields.error),
      values: {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        image_url: imageUrl,
        userId: formData.get("user_id")?.toString(),
        quantity: formData.get("quantity")?.toString(),
        price: formData.get("price")?.toString(),
        category: formData.get("category")?.toString(),
      },
    };
  }
  const { title, description, image_url, userId, quantity, price, category } =
    validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  try {
    const [product] = await sql`
            INSERT INTO products (title, description, image_url, user_id, quantity, price, category, created_at)
            VALUES (${title}, ${description}, ${image_url}, ${userId}, ${quantity}, ${price}, ${category}, ${date})
            RETURNING product_id,
              title,
              description,
              image_url,
              user_id,
              quantity,
              price,
              category;
        `;
    return {
      message: "Product created successfully.",
      success: true,
      values: {
        product_id: product.product_id,
        title: product.title,
        description: product.description,
        image_url: product.image_url,
        userId: product.user_id,
        quantity: product.quantity,
        price: product.price,
        category: product.category,
      },
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      message: "Error creating product. Please try again.",
      values: {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        image_url: formData.get("image_url")?.toString(),
        userId: formData.get("user_id")?.toString(),
        quantity: formData.get("quantity")?.toString(),
        price: formData.get("price")?.toString(),
        category: formData.get("category")?.toString(),
      },
    };
  }
  //TODO or revalidate path where products are listed
}

export async function updateOrDeleteProduct(
  prevState: ProductFormState | undefined,
  formData: FormData,
): Promise<ProductFormState> {
  const intent = formData.get("_action");
  console.log("Intent:", intent);
  if (intent === "update") {
    return await updateProduct(prevState, formData);
  } else if (intent === "delete") {
    const productId = formData.get("product_id")?.toString();
    if (!productId) {
      return {
        message: "Product ID is required for deletion.",
        success: false,
      };
    }
    return await deleteProduct(prevState, formData);
  }
}

async function updateProduct(
  prevState: ProductFormState | undefined,
  formData: FormData,
): Promise<ProductFormState> {
  const existingUrl = formData.get("image_url")?.toString() || null;
  const imageFile = formData.get("image_file") as File | null;
  console.log("existingUrl:", existingUrl);
  console.log("imageFile:", imageFile);
  console.log(imageFile && console.log("Image file is here"));
  let imageUrl = existingUrl;
  console.log("Received image file for update:", imageFile);
  if (imageFile && imageFile.size > 0) {
    try {
      const uploadResult = await uploadImageToPinata(imageFile);
      console.log("Image uploaded to Pinata:", uploadResult);
      imageUrl = uploadResult;
    } catch (error) {
      console.log("Error uploading image:", error);
      return {
        errors: "Error uploading image. Please try again.",
        message: "Error uploading image. Please try again.",
        values: {
          product_id: formData.get("product_id")?.toString(),
          title: formData.get("title")?.toString(),
          description: formData.get("description")?.toString(),
          image_url: imageUrl,
          userId: formData.get("user_id")?.toString(),
          quantity: formData.get("quantity")?.toString(),
          price: formData.get("price")?.toString(),
          category: formData.get("category")?.toString(),
        },
      };
    }
  }
  const validatedFields = UpdateProductSchema.safeParse({
    product_id: formData.get("product_id")?.toString(),
    title: formData.get("title"),
    description: formData.get("description"),
    image_url: imageUrl,
    userId: formData.get("user_id")?.toString(),
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : undefined,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    category: formData.get("category"),
  });
  console.log("updateProduct called with:", {
    product_id: formData.get("product_id")?.toString(),
    title: formData.get("title"),
    description: formData.get("description"),
    image_url: imageUrl,
    userId: formData.get("user_id")?.toString(),
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : undefined,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    category: formData.get("category"),
  });
  if (!validatedFields.success) {
    return {
      errors: z.prettifyError(validatedFields.error),
      message: z.prettifyError(validatedFields.error),
      values: {
        product_id: formData.get("product_id")?.toString(),
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        image_url: imageUrl,
        userId: formData.get("user_id")?.toString(),
        quantity: formData.get("quantity")?.toString(),
        price: formData.get("price")?.toString(),
        category: formData.get("category")?.toString(),
      },
    };
  }
  const {
    product_id,
    title,
    description,
    image_url,
    userId,
    quantity,
    price,
    category,
  } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  try {
    const [product] = await sql`
            UPDATE products SET title = ${title}, description = ${description}, image_url = ${image_url}, user_id = ${userId}, quantity = ${quantity}, price = ${price}, category = ${category}, updated_at = ${date}
            WHERE product_id = ${product_id}
            RETURNING product_id,
              title,
              description,
              image_url,
              user_id,
              quantity,
              price,
              category;
        `;
    return {
      message: "Product created successfully.",
      success: true,
      values: {
        product_id: product.product_id,
        title: product.title,
        description: product.description,
        image_url: product.image_url,
        userId: product.user_id,
        quantity: product.quantity,
        price: product.price,
        category: product.category,
      },
    };
  } catch (error) {
    console.error("Error creating/updating product:", error);
    return {
      message: "Error updating product. Please try again.",
      values: {
        product_id: formData.get("product_id")?.toString(),
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        image_url: imageUrl,
        userId: formData.get("user_id")?.toString(),
        quantity: formData.get("quantity")?.toString(),
        price: formData.get("price")?.toString(),
        category: formData.get("category")?.toString(),
      },
    };
  }
  //TODO or revalidate path where products are listed
}

async function deleteProduct(
  prevState: ProductFormState | undefined,
  formData: FormData,
): Promise<ProductFormState> {
  const productId = formData.get("product_id")?.toString();
  if (!productId) {
    return {
      message: "Product ID is required for deletion.",
      success: false,
      values: {},
    };
  }
  try {
    await sql`
            DELETE FROM products WHERE product_id = ${productId}`;

    revalidatePath("/products");
    redirect("/products");
  } catch (error) {
    console.error("Error creating/updating product:", error);
    return {
      message: "Error updating product. Please try again.",
      values: {
        product_id: formData.get("product_id")?.toString(),
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        image_url: formData.get("image_url")?.toString(),
        userId: formData.get("user_id")?.toString(),
        quantity: formData.get("quantity")?.toString(),
        price: formData.get("price")?.toString(),
        category: formData.get("category")?.toString(),
      },
    };
  }
}

//https://www.youtube.com/watch?v=SjkGWyWEVjI
//From File & Image Uploads in Next.js 15 Are Easy Now
//ByteGrad
async function uploadImageToPinata(file: File): Promise<string> {
  try {
    // const data = new FormData();
    // data.set("file", file);
    const uploadData = await pinata.upload.public
      .file(file)
      .group(process.env.PINATA_GROUP_ID || "handcrafted-haven-group");
    const cid = (uploadData as any).cid ?? (uploadData as any).IpfsHash; // Adjust based on actual response structure
    const imageUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`;
    console.log("Pinata upload url:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
}

export async function rateProduct(data: {
  productId: string;
  rating: number;
}): Promise<RateProductResult> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "You must be logged in to rate." };
  }

  // Normalize clicks/inputs and keep the DB constraint intact.
  const rating = Math.round(Number(data.rating));
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { success: false, message: "Rating must be between 1 and 5." };
  }

  try {
    // Upsert so each user keeps a single rating per product.
    await sql`
      INSERT INTO product_ratings (product_id, user_id, rating)
      VALUES (${data.productId}, ${userId}, ${rating})
      ON CONFLICT (product_id, user_id)
      DO UPDATE SET rating = EXCLUDED.rating
    `;

    revalidatePath("/");
    revalidatePath(`/products/view/${data.productId}`);
    return { success: true, message: "Thanks for your rating!", rating };
  } catch (error) {
    console.error("Error saving rating:", error);
    return { success: false, message: "Unable to save rating." };
  }
}

export async function rateProductFromForm(
  prevState: {
    message: string | null;
    success: boolean;
    rating: number | null;
    review: string | null;
  },
  formData: FormData,
) {
  const session = await auth();
  const userId = session?.user?.id;
console.log("rateProductFromForm called with:", {
  product_id: formData.get("product_id")?.toString(),
  rating: formData.get("rating")?.toString(),
  review: formData.get("review")?.toString(),
  user_id: formData.get("user_id")?.toString(),
});
  const productId = formData.get("product_id")?.toString();
  const ratingValue = Number(formData.get("rating"));
  const rating = Math.round(ratingValue);
  const review = formData.get("review")?.toString() ?? null;
  
  if (!userId) {
    return {
      message: "You must be logged in to rate.",
      success: false,
      rating: rating ?? prevState.rating ?? null,
      review: review ?? prevState.review ?? null,
    };
  }

  // Read form inputs and apply the same validation used by the inline stars.

  if (!productId) {
    return {
      message: "Missing product.",
      success: false,
      rating: rating ?? prevState.rating ?? null,
      review: review ?? prevState.review ?? null,
    };
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return {
      message: "Rating must be between 1 and 5.",
      success: false,
      rating: rating ?? prevState.rating ?? null,
      review: review ?? prevState.review ?? null,
    };
  }

  try {
    // Same upsert path as the inline rating action.
    await sql`
      INSERT INTO product_ratings (product_id, user_id, rating, review)
      VALUES (${productId}, ${userId}, ${rating}, ${review})
      ON CONFLICT (product_id, user_id)
      DO UPDATE SET rating = EXCLUDED.rating, review = EXCLUDED.review
    `;

    revalidatePath("/");
    revalidatePath(`/products/view/${productId}`);
    revalidatePath(`/products/view/${productId}/review`);

    return {
      message: "Review saved.",
      success: true,
      rating,
      review,
    };
  } catch (error) {
    console.error("Error saving rating:", error);
    return {
      message: "Unable to save rating.",
      success: false,
      rating: rating ?? prevState.rating ?? null,
      review: review ?? prevState.review ?? null,
    };
  }
}
