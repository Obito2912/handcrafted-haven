// This file contains type definitions for data in the database
export type User = {
    id: string;
    email: string;
    password_hash: string;
    created_at: string; // ISO date string
};

export type UserProfile = {
    user_id: string;
    name: string;
    age: number | null;
    gender: 'male' | 'female' | null;
    bio: string | null;
    image_url: string | null;
    created_at: string; // ISO date string
}

export type Product = {
    product_id: string;
    title: string;
    description: string;
    image_url: string;
    user_id: string;
    quantity: number;
    price: number;
    created_at: string; // ISO date string
}