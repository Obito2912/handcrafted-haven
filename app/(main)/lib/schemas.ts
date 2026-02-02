import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  profile_image_url: z
    .url("Profile Image URL must be a valid URL")
    .max(200, "Profile Image URL must be at most 200 characters"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
  //   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  //   .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  //   .regex(/[0-9]/, 'Password must contain at least one number')
  //   .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export const LoginFormSchema = FormSchema.omit({
  name: true,
  profile_image_url: true,
});
export const SignupFormSchema = FormSchema;
type FormState<TFields extends string> = {
  errors?: string;//Partial<Record<TFields, string[]>>;
  message?: string | null;
  values?: {
    name?: string;
    profile_image_url?: string;
    email?: string;
  };
};

export type AuthFormState = FormState<
  "name" | "profile_image_url" | "email" | "password"
>;
export type ProfileFormState = FormState<
  "user_id" | "name" | "bio" | "gender" | "profile_image_url" | "age"
>;
export const ProfileSchema = z.object({
  user_id: z.uuid(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  bio: z.string().max(500, "Bio must be at most 500 characters"),
  gender: z.enum(["Male", "Female"]),
  profile_image_url: z
    .string()
    //.url('Image URL must be a valid URL')
    .max(200, "Image URL must be at most 200 characters"),
  age: z
    .number()
    .min(10, "Age must be at least 10")
    .max(120, "Age must be at most 120")
    .nullable(),
});
