import {
  createPertemuan,
  getAllPertemuan,
  getPertemuanById,
  updatePertemuan,
  deletePertemuan,
} from '../../services/pertemuan/pertemuan.service.js';

// CREATE
export async function createPertemuanHandler(req, res, next) {
  const { kelas_id, judul, tanggal, deskripsi_tugas, link_lampiran } = req.body;
  const pertemuan = await createPertemuan({
    kelas_id,
    judul,
    tanggal: new Date(tanggal),
    deskripsi_tugas,
    link_lampiran,
  });
  return res.status(201).json(pertemuan);
}

// GET ALL
export async function getAllPertemuanHandler(req, res, next) {
  const pertemuanList = await getAllPertemuan();
  return res.json(pertemuanList);
}

// GET BY ID
export async function getPertemuanByIdHandler(req, res, next) {
  const { id } = req.params;
  const pertemuan = await getPertemuanById(id);
  if (!pertemuan) {
    const error = new Error('Pertemuan tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return res.json(pertemuan);
}

// UPDATE
export async function updatePertemuanHandler(req, res, next) {
  const { id } = req.params;
  const { Kelas_id, judul, tanggal, deskripsi_tugas, link_lampiran } = req.body;
  const pertemuan = await updatePertemuan(id, {
    Kelas_id,
    judul,
    tanggal: tanggal ? new Date(tanggal) : undefined,
    deskripsi_tugas,
    link_lampiran,
  });
  return res.json(pertemuan);
}

// DELETE (soft)
export async function deletePertemuanHandler(req, res, next) {
  const { id } = req.params;
  await deletePertemuan(id);
  return res.status(204).send(); // No Content
}