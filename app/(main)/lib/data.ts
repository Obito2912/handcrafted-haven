import postgres from "postgres";
import { Product, User, UserProfile } from "./definitions";

import { UserProfileValue } from "./schemas/profileSchemas";
import { ProductValue } from "./schemas/productSchema";
import { toUserProfileValues, toProductValue } from "./mappers";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchProductData(): Promise<{
  productData: Product[];
  rating: number;
}> {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log("Fetching product data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const productData: Product[] = await sql<Product[]>`
            SELECT 
                product_id,
                title,
                description,
                image_url,
                user_id,
                quantity,
                price,
                created_at
            FROM products
            ORDER BY created_at DESC
        `;
    console.log("Product data fetched:", productData.length);
    //TODO Stacy create product ratings table
    //TODO Nefi get all the ratings for each product and calculate average rating
    //table defined in lib/definitions.ts
    const rating = 4;
    return { productData, rating }; //Return rating also
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data.");
  }
}

/**
 * Fetch information about a single user.
 * - Queries the `users` table by user ID
 * - Returns a User object if found, otherwise null
 */
export async function fetchUserInformation(
  userId: string,
): Promise<User | null> {
  try {
    console.log("Fetching user information...");
    const [user] = await sql<User[]>`
      SELECT 
        id,
        email,
        password_hash,
        created_at
      FROM users
      WHERE id = ${userId}
    `;
    return user || null;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("Failed to fetch user information.");
  }
}

/**
 * Fetch all products that belong to a specific user.
 * - Queries the `products` table by user ID
 * - Returns an array of Product objects
 */
export async function fetchUserProducts(userId: string): Promise<Product[]> {
  try {
    console.log("Fetching products for user:", userId);
    const products = await sql<Product[]>`
      SELECT 
        product_id,
        title,
        description,
        image_url,
        user_id,
        quantity,
        price,
        category,
        created_at
      FROM products
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return products;
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw new Error("Failed to fetch user products.");
  }
}

export async function fetchProductById(productId: string): Promise<{
  product: ProductValue | null;
}> {
  try {
    console.log(`Fetching product for id ${productId}...`);
    const products: Product[] = await sql<Product[]>`
            SELECT 
                product_id,
                title,
                description,
                image_url,
                user_id,
                quantity,
                price,
                created_at
            FROM products
            WHERE product_id = ${productId}
            LIMIT 1
            ORDER BY created_at DESC
        `;
    console.log("Product fetched:", products);
    if (products.length === 0) {
      throw new Error('Product not found');
    }
    const productValue = toProductValue(products[0]);
    return { product: productValue };    
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
}

export async function fetchProductDataByUser(userId: string): Promise<{
  productData: Product[];
}> {
  try {
    console.log(`Fetching product data for user ${userId}...`);

    const productData: Product[] = await sql<Product[]>`
            SELECT 
                product_id,
                title,
                description,
                image_url,
                user_id,
                quantity,
                price,
                created_at
            FROM products
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;
    console.log("Product  fetched:", productData.length);
    return { productData };
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data.");
  }
}

export async function fetchUserProfile(
  userId: string,
): Promise<{ userProfile: UserProfileValue }> {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log("Fetching user profile...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const userProfiles: UserProfile[] = await sql<UserProfile[]>`
            SELECT 
                user_id,
                name,
                age,
                gender,
                bio,
                image_url,
                user_type
            FROM user_profiles
           WHERE user_id = ${userId}
            ORDER BY created_at DESC
            LIMIT 1
        `;
    console.log("Profile data fetched:", userProfiles.length);
    const userProfile = userProfiles[0] || null;
    const userProfileValues = toUserProfileValues(userProfile);
    return { userProfile: userProfileValues };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return undefined;
  }
}

//TODO Marco
//Look at data.ts for table structure that Stacy will add to app\seed\route.ts
//Add fetchUserInformation
//Add fetchUserProducts
//Look at financial dashboard app\lib\data.ts

//TODO Nefi
//Add fetchProductsByFilters
