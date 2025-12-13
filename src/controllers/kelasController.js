import {
  createKelas as createKelasService,
  getAllKelas as getAllKelasService,
  getKelasById as getKelasByIdService,
  updateKelas as updateKelasService,
  deleteKelas as deleteKelasService,
} from '../services/kelasServices.js';

//Create kelas
export const createKelas = async (req, res) => {
  try {
    const kelas = await createKelasService(req.body);
    return res.status(201).json({ success: true,  kelas });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Nama kelas sudah digunakan' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get all kelas with pagination
export const getAllKelas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getAllKelasService({ page: parseInt(page), limit: parseInt(limit) });
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get kelas by ID with pertemuan
export const getKelasById = async (req, res) => {
  try {
    const { id } = req.params;
    const kelas = await getKelasByIdService(id);
    if (!kelas) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    return res.status(200).json({ success: true,  kelas });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Update kelas
export const updateKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const kelas = await updateKelasService(id, req.body);
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

//Delete kelas
export const deleteKelas = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteKelasService(id);
    return res.status(200).json({ success: true, message: 'Kelas berhasil dihapus' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};