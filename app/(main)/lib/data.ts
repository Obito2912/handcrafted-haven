import postgres from "postgres";

import {
    Product,
    UserProfile
} from './definitions';

import { UserProfileValue } from './schemas/profileSchemas';
import { toUserProfileValues } from './mappers';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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
    console.log("Product data fetched:", productData.length);
    //TODO Stacy create product ratings table
    //TODO Nefi get all the ratings for each product and calculate average rating
    //table defined in lib/definitions.ts
    return { productData };
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data.");
  }
}
//TODO Marco
//Look at data.ts for table structure that Stacy will add to app\seed\route.ts
//Add fetchUserInformation
//Add fetchUserProducts
//Look at financial dashboard app\lib\data.ts

//TODO Nefi
//Add fetchProductsByFilters

export async function fetchUserProfile(userId: string): Promise<UserProfileValue | null> {
    try 
    {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        console.log('Fetching user profile...');
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
        console.log('Profile data fetched:', userProfiles.length);
    const userProfile = userProfiles[0] || null;
    const userProfileValues = toUserProfileValues(userProfile);
    return userProfileValues;
    } catch (error) {       
        console.error('Error fetching user profile:', error);
        return null;
    }
}