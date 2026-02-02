import { z } from 'zod';

const FormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  email: z.email(),
  password: z.string()
  .min(6, 'Password must be at least 6 characters')
  .max(100)
//   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
//   .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
//   .regex(/[0-9]/, 'Password must contain at least one number')
//   .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),  
});

export const LoginFormSchema = FormSchema.omit({ name: true});
export const SignupFormSchema = FormSchema;
type FormState<TFields extends string> = {
    errors?: string;//Partial<Record<TFields, string[]>>;
    message?: string | null;
    values?: {
    name?: string;
    email?: string;
}
};

export type AuthFormState = FormState<'name' | 'email' | 'password'>;
export type ProfileFormState = FormState<'user_id' | 'name' | 'bio' | 'gender' | 'image_url' | 'age'>;
export const ProfileSchema = z.object({
    user_id: z.uuid(),
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100),
    bio: z.string()
      .max(500, 'Bio must be at most 500 characters'),
    gender: z.enum(['Male', 'Female']),
    image_url: z.string()
    //.url('Image URL must be a valid URL')
    .max(200, 'Image URL must be at most 200 characters'),
    age: z.number()
      .min(10, 'Age must be at least 10')
      .max(120, 'Age must be at most 120')
      .nullable(),
});
