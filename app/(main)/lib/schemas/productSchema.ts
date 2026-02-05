import { z } from "zod";
import { ProductCategories } from "../definitions";

export const ProductSchema = z.object({
  product_id: z.uuid(),
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
  image_url: z.string().max(200, "Image URL must be at most 200 characters"),
  userId: z.uuid(),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  price: z.number().min(0, "Price cannot be negative"),
  category: z.enum(ProductCategories),
});

export const CreateProductSchema = ProductSchema.omit({ product_id: true });
export const UpdateProductSchema = ProductSchema;
export type ProductValue = z.infer<typeof ProductSchema>;

type FormState<TValues> = {
  errors?: string;
  message?: string | null;
  success?: boolean;
  values?: Partial<Record<keyof TValues, string>>;
};

export type ProductFormState = FormState<ProductValue>;
