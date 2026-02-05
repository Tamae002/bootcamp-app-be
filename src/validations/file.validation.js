import { z } from 'zod';

// Upload single file schema
export const uploadFileSchema = z.object({
  body: z.object({
    nama: z.string().min(1, 'Nama file is required'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Upload multiple files schema
export const uploadMultipleFilesSchema = z.object({
  body: z.object({
    nama: z.string().min(1, 'Nama file is required'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Serve file schema
export const serveFileSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    filename: z.string().min(1, 'Filename is required'),
  }),
  query: z.object({}).optional(),
});
