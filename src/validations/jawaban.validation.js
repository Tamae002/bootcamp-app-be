import { z } from 'zod';

// Create jawaban schema
export const createJawabanSchema = z.object({
  body: z.object({
    file_path: z.string().min(1, 'File path is required'),
    deskripsi: z.string().optional(),
  }),
  params: z.object({
    pertemuan_id: z.string().cuid('Invalid pertemuan ID'),
  }),
  query: z.object({}).optional(),
});

// Beri nilai jawaban schema
export const beriNilaiSchema = z.object({
  body: z.object({
    nilai: z.number().int().min(0).max(100, 'Nilai harus antara 0-100'),
  }),
  params: z.object({
    jawaban_id: z.string().cuid('Invalid jawaban ID'),
  }),
  query: z.object({}).optional(),
});

// Get jawaban by pertemuan schema
export const getJawabanByPertemuanSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    pertemuan_id: z.string().cuid('Invalid pertemuan ID'),
  }),
  query: z.object({}).optional(),
});
