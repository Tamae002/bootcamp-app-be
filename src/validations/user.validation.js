import { z } from 'zod';

// Create user schema
export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Email tidak valid').max(255, 'Email maksimal 255 karakter'),
    password: z.string().min(8, 'Password minimal 8 karakter').max(255, 'Password maksimal 255 karakter'),
    name: z.string().min(1, 'Nama is required').max(255, 'Nama maksimal 255 karakter'),
    role: z.enum(['admin', 'mentor', 'user'], {
      errorMap: () => ({ message: 'Role harus admin, mentor, atau user' }),
    }),
    gambar: z.string().max(255, 'Gambar path maksimal 255 karakter').optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Update user schema
export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email('Email tidak valid').max(255, 'Email maksimal 255 karakter').optional(),
    password: z.string().min(8, 'Password minimal 8 karakter').max(255, 'Password maksimal 255 karakter').optional(),
    name: z.string().min(1, 'Nama is required').max(255, 'Nama maksimal 255 karakter').optional(),
    role: z.enum(['admin', 'mentor', 'user'], {
      errorMap: () => ({ message: 'Role harus admin, mentor, atau user' }),
    }).optional(),
    gambar: z.string().max(255, 'Gambar path maksimal 255 karakter').optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().cuid('Invalid user ID'),
  }),
  query: z.object({}).optional(),
});

// Get user by ID schema
export const getUserByIdSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.string().cuid('Invalid user ID'),
  }),
  query: z.object({}).optional(),
});

// Get all users schema
export const getAllUsersSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page harus angka').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit harus angka').optional(),
    search: z.string().optional(),
    role: z.enum(['admin', 'mentor', 'user'], {
      errorMap: () => ({ message: 'Role harus admin, mentor, atau user' }),
    }).optional(),
  }).optional(),
});

// Get user me schema
export const getUserMeSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Get user kelas schema
export const getUserKelasSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page harus angka').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit harus angka').optional(),
  }).optional(),
});

// Delete user schema
export const deleteUserSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.string().cuid('Invalid user ID'),
  }),
  query: z.object({}).optional(),
});
