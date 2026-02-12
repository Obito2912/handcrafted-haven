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
  gender: "male" | "female" | null;
  bio: string | null;
  image_url: string | null;
  user_type: "buyer" | "seller" | null;
  created_at: string; // ISO date string
};

export const ProductCategories = [
  "painting",
  "sculpture",
  "craft",
  "drawing",
  "photography",
  "art",
  "other",
] as const;

export type ProductCategory = (typeof ProductCategories)[number];

export type Product = {
  product_id: string;
  title: string;
  description: string;
  image_url: string;
  user_id: string;
  quantity: number;
  price: number;
  category: ProductCategory;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

export type UserProducts = {
  user_id: string;
  product_id: string;
};

export type ProductRating = {
  product_id: string;
  user_id: string;
  rating: number; // 1 to 5
  review: string | null;
  created_at: string; // ISO date string
};

export type ProductAverageRating = {
  product_id: string;  
  average_rating: number; // 1 to 5
};


export type RateProductResult = {
  success: boolean;
  message: string;
  rating?: number;
};

export type ProductRatingDisplay = {
  productId: string;
  userId: string;
  userName: string;
  userImageUrl: string | null;
  rating: number; // 1 to 5
  review: string | null;
  createdAt: string; // ISO date string
};