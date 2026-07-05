import { z } from 'zod';

/**
 * Sign-Up schema. Enforces password strength and ensures the confirm
 * password matches via a refine() check.
 */
export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be 50 characters or fewer'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Add at least one uppercase letter')
      .regex(/[a-z]/, 'Add at least one lowercase letter')
      .regex(/[0-9]/, 'Add at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
