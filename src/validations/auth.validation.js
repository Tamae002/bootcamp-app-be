import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(1, 'Password is required'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Email tidak valid'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
  }),
  params: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
  query: z.object({}).optional(),
});