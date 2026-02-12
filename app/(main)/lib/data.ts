import postgres from "postgres";
import {
  Product,
  ProductAverageRating, 
  ProductCategory,
  ProductRatingDisplay, 
  User,
  UserProfile,
  Cart,
  CartItem,
  CartItemWithProduct,
} from "./definitions";

import { UserProfileValue } from "./schemas/profileSchemas";
import { ProductValue } from "./schemas/productSchema";
import { toUserProfileValues, toProductValue } from "./mappers";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchProductData(): Promise<{
  productData: Product[];
  ratingRows: ProductAverageRating[];
}> {
  try {
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
    
    const ratingRows: ProductAverageRating [] = await sql`
            SELECT product_id, AVG(rating) AS average_rating
            FROM product_ratings
            GROUP BY product_id
          `;
    
    return { productData, ratingRows }; //Return rating also
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
  ratingRows: ProductAverageRating[];
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

    const ratingRows: ProductAverageRating[] =
       await sql`
            SELECT product_id, ROUND(AVG(rating)) AS average_rating
            FROM product_ratings
            GROUP BY product_id
          `;

    return { productData, ratingRows };
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
export async function fetchUserProducts(userId: string): Promise<{
  productData: Product[];
  averageRatings: ProductAverageRating[];
  allRatings: ProductRatingDisplay[];
}> {
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
    console.log(`Fetched ${products.length} products for user ${userId}`);

    const averageRatings = await sql<ProductAverageRating[]>`
            SELECT product_id, ROUND(AVG(rating)) AS average_rating
FROM product_ratings
WHERE product_id IN (
  SELECT product_id 
  FROM products 
  WHERE user_id = ${userId}
)
GROUP BY product_id`;

    const allRatings = await sql<ProductRatingDisplay[]>`
            SELECT 
                a.product_id as ProductId,
                b.user_id as UserId,
                name as UserName,
                c.image_url as UserImageUrl,
                rating,
                review,
                a.created_at as CreatedAt
            FROM product_ratings a
            INNER JOIN products b on a.product_id = b.product_id
            INNER JOIN user_profiles c ON b.user_id = c.user_id
            WHERE a.product_id IN (
              SELECT product_id 
              FROM products 
              WHERE user_id = ${userId}
            )
        `;

    return { productData: products, averageRatings, allRatings };
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw new Error("Failed to fetch user products.");
  }
}

export async function fetchProductById(
  productId: string,
): Promise<ProductValue | null> {
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
        `;

    if (products.length === 0) {
      return null;
    }
    const productValue = toProductValue(products[0]);
    return productValue;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
}

export async function fetchProductDetail(productId: string): Promise<{
  productValue: ProductValue | null;
  averageRating: number | null;
  allRatings: ProductRatingDisplay[];
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
        `;
    console.log("Product fetched:", products);
 
    if (products.length === 0) {
      return { productValue: null, averageRating: null, allRatings: [] };
    }
   const averageRatings = await sql<ProductAverageRating[]>`
            SELECT ROUND(AVG(rating)) AS average_rating
            FROM product_ratings
            WHERE product_id = ${productId}
        `;
    const averageRating = averageRatings[0]?.average_rating || null;
    const allRatings = await sql<ProductRatingDisplay[]>`
            SELECT 
                a.product_id as "productId",
                b.user_id as "userId",
                name as "userName",
                c.image_url as "userImageUrl",
                rating,
                review,
                a.created_at as "createdAt"
            FROM product_ratings a
            INNER JOIN products b on a.product_id = b.product_id
            INNER JOIN user_profiles c ON b.user_id = c.user_id
            WHERE a.product_id = ${productId}
        `;    
    const productValue = toProductValue(products[0]);
    return { productValue, averageRating, allRatings };    
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
}

export async function fetchProductDataByUser(userId: string): Promise<{
  productData: Product[]
  averageRatings: ProductAverageRating[];
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
    if (productData.length === 0) {
      return { productData: [], averageRatings: []};
    }
    const averageRatings = await sql<ProductAverageRating[]>`
            SELECT product_id, ROUND(AVG(rating)) AS average_rating
            FROM product_ratings
            WHERE product_id IN (
              SELECT product_id 
              FROM products 
              WHERE user_id = ${userId}
            )
            GROUP BY product_id`;

    // const ratings: ProductRating[] = await sql<ProductRating[]>`
    //         SELECT 
    //             product_id,
    //             user_id,
    //             rating,
    //             review
    //         FROM product_ratings
    //         WHERE product_id IN (
    //           SELECT product_id 
    //           FROM products 
    //           WHERE user_id = ${userId}
    //         )
    //     `;    
    // const productDataValues = productData.map( (p) => toProductValue(p));
    return { productData, averageRatings };
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data.");
  }
}

export async function fetchUserProfile(
  userId: string,
): Promise<UserProfileValue | undefined> {
  try {
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
    return userProfileValues;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return undefined;
  }
}

export async function fetchSellerUserProfiles(): Promise<
  UserProfileValue[] | undefined
> {
  try {
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
           WHERE user_type = 'seller'
            ORDER BY name
        `;
    console.log("Profile data fetched:", userProfiles.length);
    const userProfileValues = userProfiles.map((p) => toUserProfileValues(p));
    return userProfileValues;
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return undefined;
  }
}

async function getOrCreateCart(userId: string): Promise<string> {
  try {
    // Try to get existing cart
    const existingCart = await sql<Cart[]>`
      SELECT cart_id FROM carts WHERE user_id = ${userId}
    `;

    if (existingCart.length > 0) {
      return existingCart[0].cart_id;
    }

    // Create new cart if none exists
    const newCart = await sql<Cart[]>`
      INSERT INTO carts (user_id)
      VALUES (${userId})
      RETURNING cart_id
    `;

    return newCart[0].cart_id;
  } catch (error) {
    console.error("Error getting or creating cart:", error);
    throw new Error("Failed to get or create cart");
  }
}

/**
 * Fetch all cart items for a user with product details
 */
export async function fetchCartItems(
  userId: string,
): Promise<CartItemWithProduct[]> {
  try {
    // Use a different type for the raw SQL result
    const rawCartItems = await sql<
      {
        cart_item_id: string;
        cart_id: string;
        product_id: string;
        quantity: number;
        added_at: string;
        title: string;
        description: string;
        image_url: string;
        product_user_id: string;
        price: number;
        category: string;
        product_created_at: string;
        product_updated_at: string;
      }[]
    >`
      SELECT 
        ci.cart_item_id,
        ci.cart_id,
        ci.product_id,
        ci.quantity,
        ci.added_at,
        p.title,
        p.description,
        p.image_url,
        p.user_id as product_user_id,
        p.price,
        p.category,
        p.created_at as product_created_at,
        p.updated_at as product_updated_at
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.cart_id
      JOIN products p ON ci.product_id = p.product_id
      WHERE c.user_id = ${userId}
      ORDER BY ci.added_at DESC
    `;

    // Transform the flat result into the expected structure
    return rawCartItems.map((item) => ({
      cart_item_id: item.cart_item_id,
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: item.quantity,
      added_at: item.added_at,
      product: {
        product_id: item.product_id,
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        user_id: item.product_user_id,
        quantity: item.quantity,
        price: item.price,
        category: item.category as ProductCategory,
        created_at: item.product_created_at,
        updated_at: item.product_updated_at,
      },
    }));
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items");
  }
}

/**
 * Add item to cart or update quantity if it already exists
 */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1,
): Promise<void> {
  try {
    const cartId = await getOrCreateCart(userId);

    // Check if item already exists in cart
    const existingItem = await sql<CartItem[]>`
      SELECT cart_item_id, quantity 
      FROM cart_items 
      WHERE cart_id = ${cartId} AND product_id = ${productId}
    `;

    if (existingItem.length > 0) {
      // Update existing item quantity
      await sql`
        UPDATE cart_items 
        SET quantity = quantity + ${quantity}
        WHERE cart_item_id = ${existingItem[0].cart_item_id}
      `;
    } else {
      // Add new item to cart
      await sql`
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES (${cartId}, ${productId}, ${quantity})
      `;
    }

    // Update cart timestamp
    await sql`
      UPDATE carts SET updated_at = now() WHERE cart_id = ${cartId}
    `;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartItemId: string): Promise<void> {
  try {
    await sql`
      DELETE FROM cart_items 
      WHERE cart_item_id = ${cartItemId}
    `;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove item from cart");
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
): Promise<void> {
  try {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await removeFromCart(cartItemId);
    } else {
      await sql`
        UPDATE cart_items 
        SET quantity = ${quantity}
        WHERE cart_item_id = ${cartItemId}
      `;
    }
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw new Error("Failed to update cart item quantity");
  }
}

/**
 * Clear all items from user's cart
 */
export async function clearCart(userId: string): Promise<void> {
  try {
    await sql`
      DELETE FROM cart_items 
      WHERE cart_id IN (
        SELECT cart_id FROM carts WHERE user_id = ${userId}
      )
    `;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}
