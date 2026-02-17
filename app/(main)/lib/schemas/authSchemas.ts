import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
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
});
export const SignupFormSchema = FormSchema;

type FormState<TFields extends string> = {
  errors?: Partial<Record<TFields, string[]>>;//This may need to be changed to string
  message?: string | null;
  values?: {
    name?: string;
    email?: string;
  };
};

export type AuthFormState = FormState<
  "name" | "email" | "password"
>;
