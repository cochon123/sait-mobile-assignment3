import { z } from 'zod';

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
] as const;

/**
 * Employee Information Form schema.
 * Demonstrates: required fields, format validation (email, phone, postal code),
 * and min/max length constraints.
 */
export const employeeSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or fewer'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      'Use the format 403-555-1234',
    ),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .regex(
      /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
      'Enter a valid Canadian postal code (e.g. T2P 1J9)',
    ),
  department: z.enum(DEPARTMENTS, {
    error: 'Please select a department',
  }),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
