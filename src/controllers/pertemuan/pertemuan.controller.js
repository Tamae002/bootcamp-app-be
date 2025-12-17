import {
  createPertemuan,
  getAllPertemuan,
  getPertemuanById,
  updatePertemuan,
  deletePertemuan,
} from '../../services/pertemuan/pertemuan.service.js';

// CREATE
export async function createPertemuanHandler(req, res) {
  try {
    const { Kelas_id, judul, tanggal, deskripsi_tugas } = req.body;
    const pertemuan = await createPertemuan({
      Kelas_id,
      judul,
      tanggal: new Date(tanggal),
      deskripsi_tugas,
    });
    return res.status(201).json(pertemuan);
  } catch (error) {
    console.error('Create pertemuan error:', error);
    return res.status(400).json({ message: 'Gagal membuat pertemuan' });
  }
}

// GET ALL
export async function getAllPertemuanHandler(req, res) {
  try {
    const pertemuanList = await getAllPertemuan();
    return res.json(pertemuanList);
  } catch (error) {
    console.error('Get all pertemuan error:', error);
    return res.status(500).json({ message: 'Gagal mengambil data' });
  }
}

// GET BY ID
export async function getPertemuanByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const pertemuan = await getPertemuanById(id);
    if (!pertemuan) {
      return res.status(404).json({ message: 'Pertemuan tidak ditemukan' });
    }
    return res.json(pertemuan);
  } catch (error) {
    console.error('Get pertemuan by ID error:', error);
    return res.status(500).json({ message: 'Gagal mengambil data' });
  }
}

// UPDATE
export async function updatePertemuanHandler(req, res) {
  try {
    const { id } = req.params;
    const { Kelas_id, judul, tanggal, deskripsi_tugas } = req.body;
    const pertemuan = await updatePertemuan(id, {
      Kelas_id,
      judul,
      tanggal: tanggal ? new Date(tanggal) : undefined,
      deskripsi_tugas,
    });
    return res.json(pertemuan);
  } catch (error) {
    console.error('Update pertemuan error:', error);
    return res.status(400).json({ message: 'Gagal memperbarui pertemuan' });
  }
}

// DELETE (soft)
export async function deletePertemuanHandler(req, res) {
  try {
    const { id } = req.params;
    await deletePertemuan(id);
    return res.status(204).send(); // No Content
  } catch (error) {
    console.error('Delete pertemuan error:', error);
    return res.status(400).json({ message: 'Gagal menghapus pertemuan' });
  }
}