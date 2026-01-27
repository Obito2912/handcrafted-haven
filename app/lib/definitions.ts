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
    profile_picture: string | null;
    created_at: string; // ISO date string
}