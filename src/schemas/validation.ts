import { z } from 'zod';

export const emailValidation = z.object({
  email: z.string().email().min(1),
});

export const passwordValidation = z.object({
  password: z.string().min(8),
});