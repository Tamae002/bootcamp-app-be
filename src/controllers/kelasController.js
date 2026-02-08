import {
  createKelasWithAnggota,
  getAllKelas as getAllKelasService,
  getKelasByIdWithAnggota,
  updateKelasWithAnggota,
  deleteKelasCascade,
} from '../services/kelasServices.js';

// Create
export const createKelas = async (req, res, next) => {
  const { added_users, ...kelasData } = req.body;
  const kelas = await createKelasWithAnggota(kelasData, added_users);
  return res.status(201).json({ success: true,  kelas });
};

// Get all
export const getAllKelas = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const { id: user_id, role } = req.auth; // ambil user_id dan role dari token

  const result = await getAllKelasService({
    page: parseInt(page),
    limit: parseInt(limit),
    role,
    user_id,
  });

  return res.status(200).json({ success: true, ...result });
};

// Get by ID
export const getKelasById = async (req, res, next) => {
  const { id } = req.params;
  const kelas = await getKelasByIdWithAnggota(id);
  if (!kelas) {
    const error = new Error('Kelas tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return res.status(200).json({ success: true,  kelas });
};

// Update
export const updateKelas = async (req, res, next) => {
  const { id } = req.params;
  const { added_users, removed_users, ...updateData } = req.body;
  const kelas = await updateKelasWithAnggota(id, updateData, added_users, removed_users);
  return res.status(200).json({ success: true,  kelas });
};

// Delete
export const deleteKelas = async (req, res, next) => {
  const { id } = req.params;
  await deleteKelasCascade(id);
  return res.status(200).json({ success: true, message: 'Kelas dan data terkait berhasil dihapus' });
};