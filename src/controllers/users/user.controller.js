import prisma from "../../config/prisma.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json({ success: true, data: users });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

const getAllKelas = async (req, res) => {
  try {
    const kelas = await prisma.kelas.findMany({
      select: {
        kelas_id: true,
        nama_kelas: true,
        deskripsi: true,
        tanggal_mulai: true,
        tanggal_berakhir: true,
      },
    });
    res.json({ success: true, data: kelas });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

const getPertemuanByKelas = async (req, res) => {
  const { kelasId } = req.params;
  try {
    const pertemuan = await prisma.pertemuan.findMany({
      where: { kelas_id: kelasId },
      select: {
        pertemuan_id: true,
        judul: true,
        deskripsi_tugas: true,
        tanggal: true,
      },
    });
    res.json({ success: true, data: pertemuan });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAllUsers,
  getAllKelas,
  getPertemuanByKelas,
};