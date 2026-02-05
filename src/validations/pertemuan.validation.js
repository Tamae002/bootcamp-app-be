import { z } from 'zod';

// Create pertemuan schema
export const createPertemuanSchema = z.object({
  body: z.object({
    kelas_id: z.string().cuid('Invalid kelas ID'),
    judul: z.string().min(1, 'Judul is required').max(255, 'Judul maksimal 255 karakter'),
    tanggal: z.string().datetime('Tanggal harus format datetime yang valid'),
    deskripsi_tugas: z.string().optional(),
    link_lampiran: z.string().url('Link harus URL yang valid').max(255, 'Link maksimal 255 karakter').optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Update pertemuan schema
export const updatePertemuanSchema = z.object({
  body: z.object({
    Kelas_id: z.string().cuid('Invalid kelas ID').optional(),
    judul: z.string().min(1, 'Judul is required').max(255, 'Judul maksimal 255 karakter').optional(),
    tanggal: z.string().datetime('Tanggal harus format datetime yang valid').optional(),
    deskripsi_tugas: z.string().optional(),
    link_lampiran: z.string().url('Link harus URL yang valid').max(255, 'Link maksimal 255 karakter').optional(),
  }),
  params: z.object({
    id: z.string().cuid('Invalid pertemuan ID'),
  }),
  query: z.object({}).optional(),
});

// Get pertemuan by ID schema
export const getPertemuanByIdSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.string().cuid('Invalid pertemuan ID'),
  }),
  query: z.object({}).optional(),
});

// Get all pertemuan schema
export const getAllPertemuanSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Delete pertemuan schema
export const deletePertemuanSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.string().cuid('Invalid pertemuan ID'),
  }),
  query: z.object({}).optional(),
});