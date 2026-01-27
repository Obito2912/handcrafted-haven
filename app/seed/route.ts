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
        profile_picture TEXT,
        created_at TIMESTAMP DEFAULT now(),
        
        CONSTRAINT fk_user_profiles_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE  
    )`;
    // Seed initial userProfiles
}
