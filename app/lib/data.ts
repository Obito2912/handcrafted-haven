import postgres from 'postgres';

import {
    Product
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProductData(): Promise<{ productData: Product[] }> {
    try 
    {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        console.log('Fetching product data...');
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
        console.log('Product data fetched:', productData.length);
    return { productData };
    } catch (error) {       
        console.error('Error fetching product data:', error);
        throw new Error('Failed to fetch product data.');
    }
}