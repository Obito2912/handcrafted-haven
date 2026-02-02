"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
  SignupFormSchema,
  ProfileSchema,
  AuthFormState,
  ProfileFormState,
} from "./schemas";

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
    profile_image_url: formData.get("profile_image_url"),
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
        profile_image_url: formData.get("profile_image_url")?.toString(),
        // Don't include password for security
      },
    };
  }

  const { name, profile_image_url, email, password } = validatedFields.data;
  const passwordHash = await bcrypt.hash(password, 10);
  const date = new Date().toISOString().split("T")[0];
  try {
    const [user] = await sql`
            INSERT INTO users (email, password_hash, created_at)
            VALUES (${email}, ${passwordHash}, ${date})
            RETURNING id
        `;

    await sql`
            INSERT INTO user_profiles (user_id, name, profile_image_url, created_at)
            VALUES (${user.id}, ${name}, ${profile_image_url}, ${date})
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

async function updateUserProfile(
  prevState: ProfileFormState | undefined,
  formData: FormData,
) {
  const validatedFields = ProfileSchema.safeParse({
    user_id: formData.get("user_id")?.toString(),
    name: formData.get("name"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    bio: formData.get("bio"),
    profile_image_url: formData.get("profile_image_url"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.prettifyError(validatedFields.error),
      message: z.prettifyError(validatedFields.error),
      values: {
        user_id: formData.get("user_id")?.toString(),
        name: formData.get("name")?.toString(),
        age: formData.get("age")?.toString(),
        gender: formData.get("gender")?.toString(),
        bio: formData.get("bio")?.toString(),
        profile_image_url: formData.get("profile_image_url")?.toString(),
      },
    };
  }

  const { user_id, name, age, gender, bio, profile_image_url } =
    validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  try {
    const [user] = await sql`
            UPDATE user_profiles 
            SET
                name = ${name},
                age = ${age},
                gender = ${gender},
                bio = ${bio},
                profile_image_url = ${profile_image_url},
                updated_at = ${date}
            WHERE user_id = ${user_id}
        `;
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      message: "Error updating user. Please try again.",
    };
  }
  //TODO Where to go?
  revalidatePath("/profile");
  redirect("/profile");
}

async function authenticate(formData: FormData) {
  console.log("authenticate called");
  try {
    await signIn("credentials", formData);
    console.log("signIn completed");
  } catch (error) {
    console.log("authenticate error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }
    throw error; // Re-throw if not an AuthError
  }
}
