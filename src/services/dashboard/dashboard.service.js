import prisma from '../../config/prisma.js';

export async function getDashboardStats() {
  const now = new Date();

  const [jumlahPeserta, jumlahMentor, jumlahKelas, jumlahPertemuanMendatang, kelasAktif] =
    await Promise.all([
      prisma.user.count({
        where: {
          role: 'mentor',
          isActive: true,
        },
      }),
      prisma.kelas.count({
        where: {
          isActive: true,
        },
      }),
      prisma.pertemuan.count({
        where: {
          tanggal: {
            gte: now,
          },
          isActive: true,
        },
      }),
      prisma.kelas.findMany({
        where: {
          isActive: true,
        },
        take: 5,
        select: {
          kelas_id: true,
          nama_kelas: true, // ← gunakan nama field yang sesuai skema
        },
      }),
    ]);

  return {
    jumlah_peserta: jumlahPeserta,
    jumlah_mentor: jumlahMentor,
    jumlah_kelas: jumlahKelas,
    jumlah_pertemuan_mendatang: jumlahPertemuanMendatang,
    kelas_aktif: kelasAktif,
  };
}