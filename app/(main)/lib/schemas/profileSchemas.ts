import { z } from 'zod';

export const ProfileSchema = z.object({
  user_id: z.uuid(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  bio: z.string().max(500, 'Bio must be at most 500 characters'),
  gender: z.enum(['male', 'female']),
 image_url: z
    .string()
    .max(200, 'Image URL must be at most 200 characters'),
  age: z
    .coerce.number()
    .min(10, 'Age must be at least 10')
    .max(120, 'Age must be at most 120')
    .nullable(),
  user_type: z.enum(['buyer', 'seller'])
});

export type UserProfileValue = z.infer<typeof ProfileSchema>;

type FormState<TValues> = {
  errors?: string;
  message?: string | null;
  success?: boolean;
  values?: Partial<Record<keyof TValues, string>>;
};

export type ProfileFormState = FormState<UserProfileValue>;

