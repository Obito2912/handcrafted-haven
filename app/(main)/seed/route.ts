// import bcrypt from "bcrypt";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// async function seedUserTable() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
//   await sql`CREATE EXTENSION IF NOT EXISTS "citext"`;
//   await sql`CREATE TABLE IF NOT EXISTS users (
//         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//         email CITEXT NOT NULL UNIQUE,
//         password_hash TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT now()
//     )`;

//   // Seed initial users
// }
// //TODO Ovi add user type column to user_profiles table
// async function seedUserProfilesTable() {
//   await sql`CREATE TABLE IF NOT EXISTS user_profiles (
//         user_id UUID PRIMARY KEY,
//         name TEXT NOT NULL,
//         age INT,
//         gender TEXT
//             CHECK (gender IN ('male', 'female')),
//         bio TEXT,
//         image_url TEXT,
//         created_at TIMESTAMP DEFAULT now(),

//         CONSTRAINT fk_user_profiles_user
//                 FOREIGN KEY (user_id)
//                 REFERENCES users(id)
//                 ON DELETE CASCADE
//     )`;
//   // Seed initial userProfiles
// }

// async function seedProductsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS products (
//  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//  title TEXT NOT NULL,
//  description TEXT NOT NULL,
//  image_url TEXT NOT NULL,
//  user_id UUID NOT NULL REFERENCES users(id),
//  quantity INT NOT NULL CHECK (quantity >= 0),
//  price DECIMAL(10,2) NOT NULL
// )`;
//   // Seed initial products
// }

// async function seedProductRatingsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS product_ratings (
//         product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
//         user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//         rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
//         review TEXT,
//         created_at TIMESTAMP DEFAULT now(),
//         PRIMARY KEY (product_id, user_id)
//     )`;
//   // Seed initial product ratings
// }

// // Seed cart table to link users to their carts with timestamps
// async function seedCartTable() {
//   await sql`CREATE TABLE IF NOT EXISTS carts (
//     cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     created_at TIMESTAMP DEFAULT now(),
//     updated_at TIMESTAMP DEFAULT now(),
//     UNIQUE(user_id)
//   )`;
// }

// // Seed cart_items table to link products to carts with quantity and timestamps
// async function seedCartItemsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS cart_items (
//     cart_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     cart_id UUID NOT NULL REFERENCES carts(cart_id) ON DELETE CASCADE,
//     product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
//     quantity INT NOT NULL CHECK (quantity > 0),
//     added_at TIMESTAMP DEFAULT now(),
//     UNIQUE(cart_id, product_id)
//   )`;
// }
// // Add a GET handler to trigger the seeding process when the /seed route is accessed
// export async function GET() {
//   try {
//     await seedUserTable();
//     await seedUserProfilesTable();
//     await seedProductsTable();
//     await seedProductRatingsTable();
//     // Add the new cart tables
//     await seedCartTable();
//     await seedCartItemsTable();

//     return Response.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     return Response.json(
//       { error: `Failed to seed database: ${error.message}` },
//       { status: 500 },
//     );
//   }
// }
