import { z } from 'zod';

/**
 * Sign-In schema. Validates format + required fields and enforces a
 * minimum password length so sign-in attempts are well-formed.
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
