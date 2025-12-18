import {
  createKelasWithAnggota,
  getAllKelas as getAllKelasService,
  getKelasByIdWithAnggota,
  updateKelasWithAnggota,
  deleteKelasCascade,
} from '../services/kelasServices.js';

// Create
export const createKelas = async (req, res) => {
  try {
    const { added_users, ...kelasData } = req.body;
    const kelas = await createKelasWithAnggota(kelasData, added_users);
    return res.status(201).json({ success: true,  kelas });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Nama kelas sudah digunakan' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all
export const getAllKelas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getAllKelasService({ page: parseInt(page), limit: parseInt(limit) }); 
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get by ID
export const getKelasById = async (req, res) => {
  try {
    const { id } = req.params;
    const kelas = await getKelasByIdWithAnggota(id);
    if (!kelas) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    return res.status(200).json({ success: true,  kelas });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update
export const updateKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const { added_users, removed_users, ...updateData } = req.body;
    const kelas = await updateKelasWithAnggota(id, updateData, added_users, removed_users);
    return res.status(200).json({ success: true,  kelas });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Nama kelas sudah digunakan' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
export const deleteKelas = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteKelasCascade(id);
    return res.status(200).json({ success: true, message: 'Kelas dan data terkait berhasil dihapus' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};