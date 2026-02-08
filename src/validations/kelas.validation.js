import { z } from 'zod';

// Create kelas schema
export const createKelasSchema = z.object({
  body: z.object({
    nama_kelas: z.string().min(1, 'Nama kelas is required').max(255, 'Nama kelas maksimal 255 karakter'),
    gambar: z.string().max(255, 'Gambar path maksimal 255 karakter').optional(),
    deskripsi: z.string().optional(),
    tanggal_mulai: z.string().datetime('Tanggal mulai harus format datetime yang valid').optional(),
    tanggal_berakhir: z.string().datetime('Tanggal berakhir harus format datetime yang valid').optional(),
    added_users: z.array(z.string().cuid('Invalid user ID')).optional(),
  }).refine((data) => {
    // Validasi: tanggal_berakhir harus lebih besar dari tanggal_mulai
    if (data.tanggal_mulai && data.tanggal_berakhir) {
      const mulai = new Date(data.tanggal_mulai);
      const berakhir = new Date(data.tanggal_berakhir);
      return berakhir > mulai;
    }
    return true; // Kalau salah satu tidak ada, skip validasi ini
  }, {
    message: 'Tanggal berakhir harus lebih besar dari tanggal mulai',
    path: ['tanggal_berakhir'], // Error akan muncul di field tanggal_berakhir
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Update kelas schema
export const updateKelasSchema = z.object({
  body: z.object({
    nama_kelas: z.string().min(1, 'Nama kelas is required').max(255, 'Nama kelas maksimal 255 karakter').optional(),
    gambar: z.string().max(255, 'Gambar path maksimal 255 karakter').optional(),
    deskripsi: z.string().optional(),
    tanggal_mulai: z.string().datetime('Tanggal mulai harus format datetime yang valid').optional(),
    tanggal_berakhir: z.string().datetime('Tanggal berakhir harus format datetime yang valid').optional(),
    added_users: z.array(z.string().cuid('Invalid user ID')).optional(),
    removed_users: z.array(z.string().cuid('Invalid user ID')).optional(),
    isActive: z.boolean().optional(),
  }).refine((data) => {
    // Validasi: tanggal_berakhir harus lebih besar dari tanggal_mulai
    if (data.tanggal_mulai && data.tanggal_berakhir) {
      const mulai = new Date(data.tanggal_mulai);
      const berakhir = new Date(data.tanggal_berakhir);
      return berakhir > mulai;
    }
    return true;
  }, {
    message: 'Tanggal berakhir harus lebih besar dari tanggal mulai',
    path: ['tanggal_berakhir'],
  }),
  params: z.object({
    id: z.string().cuid('Invalid kelas ID'),
  }),
  query: z.object({}).optional(),
});

// Get kelas by ID schema
export const getKelasByIdSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.string().cuid('Invalid kelas ID'),
  }),
  query: z.object({}).optional(),
});

// Get all kelas schema
export const getAllKelasSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page harus angka').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit harus angka').optional(),
  }).optional(),
});

// Delete kelas schema
export const deleteKelasSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.string().cuid('Invalid kelas ID'),
  }),
  query: z.object({}).optional(),
});