import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUserTable() {
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
    await sql`CREATE EXTENSION IF NOT EXISTS "citext"`;
    await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email CITEXT NOT NULL UNIQUE, 
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now()
    )`;

    
    // Seed initial users
}

async function seedUserProfilesTable() {
    await sql`CREATE TABLE IF NOT EXISTS user_profiles (
        user_id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        age INT,
        gender TEXT
            CHECK (gender IN ('male', 'female')),
        bio TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT now(),
        
        CONSTRAINT fk_user_profiles_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE  
    )`;
    // Seed initial userProfiles
}

async function seedProductsTable() {
    await sql`CREATE TABLE IF NOT EXISTS products (
 product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 image_url TEXT NOT NULL,
 user_id UUID NOT NULL REFERENCES users(id),
 quantity INT NOT NULL CHECK (quantity >= 0),
 price DECIMAL(10,2) NOT NULL
)`;
    // Seed initial products
}