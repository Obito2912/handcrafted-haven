import postgres from "postgres";
import { Product, ProductCategory, User, UserProfile } from "./definitions";

import { UserProfileValue } from "./schemas/profileSchemas";
import { toUserProfileValues } from "./mappers";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchProductData(): Promise<{
  productData: Product[];
  rating: number;
  ratingsByProduct: Record<string, number | null>; // Nefi added the rating by average by product
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
    const [{ exists: ratingsTableExists } = { exists: null }] = await sql<
      { exists: string | null }[]
    >`
        SELECT to_regclass('public.product_ratings') AS exists
      `;

    const ratingRows: { product_id: string; avg_rating: number | null }[] =
      ratingsTableExists
        ? await sql`
            SELECT product_id, AVG(rating) AS avg_rating
            FROM product_ratings
            GROUP BY product_id
          `
        : [];

    const ratingsByProduct = ratingRows.reduce<Record<string, number | null>>(
      (acc, row) => {
        acc[row.product_id] =
          row.avg_rating === null ? null : Number(row.avg_rating);
        return acc;
      },
      {},
    );

    const rating = ratingRows.length
      ? ratingRows.reduce((sum, row) => sum + Number(row.avg_rating ?? 0), 0) /
        ratingRows.length
      : 0;
    return { productData, rating, ratingsByProduct }; //Return rating also
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data.");
  }
}

export type ProductFilters = {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: ProductCategory | string;
};

export async function fetchProductsByFilters(filters: ProductFilters): Promise<{
  productData: Product[];
  rating: number;
  ratingsByProduct: Record<string, number | null>;
}> {
  try {
    console.log("Fetching filtered product data...");

    const conditions = [] as ReturnType<typeof sql>[];

    if (filters.query) {
      conditions.push(sql`title ILIKE ${`%${filters.query}%`}`);
    }

    if (filters.category) {
      conditions.push(sql`category = ${filters.category}`);
    }

    if (filters.minPrice !== undefined) {
      conditions.push(sql`price >= ${filters.minPrice}`);
    }

    if (filters.maxPrice !== undefined) {
      conditions.push(sql`price <= ${filters.maxPrice}`);
    }

    let whereClause = sql``;

    conditions.forEach((condition, index) => {
      if (index === 0) {
        whereClause = sql`WHERE ${condition}`;
      } else {
        whereClause = sql`${whereClause} AND ${condition}`;
      }
    });

    const productData: Product[] = await sql<Product[]>`
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
            ${whereClause}
            ORDER BY created_at DESC
        `;
    const [{ exists: ratingsTableExists } = { exists: null }] = await sql<
      { exists: string | null }[]
    >`
        SELECT to_regclass('public.product_ratings') AS exists
      `;

    const ratingRows: { product_id: string; avg_rating: number | null }[] =
      ratingsTableExists
        ? await sql`
            SELECT product_id, AVG(rating) AS avg_rating
            FROM product_ratings
            GROUP BY product_id
          `
        : [];

    const ratingsByProduct = ratingRows.reduce<Record<string, number | null>>(
      (acc, row) => {
        acc[row.product_id] =
          row.avg_rating === null ? null : Number(row.avg_rating);
        return acc;
      },
      {},
    );

    const rating = ratingRows.length
      ? ratingRows.reduce((sum, row) => sum + Number(row.avg_rating ?? 0), 0) /
        ratingRows.length
      : 0;
    return { productData, rating, ratingsByProduct };
  } catch (error) {
    console.error("Error fetching filtered product data:", error);
    throw new Error("Failed to fetch filtered product data.");
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
