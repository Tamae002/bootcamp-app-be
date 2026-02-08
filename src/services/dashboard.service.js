import prisma from '../config/prisma.js';

export async function getDashboardStats() {
  const now = new Date();

  const [jumlahPeserta, jumlahMentor, jumlahPertemuan, jumlahKelas, kelasAktif] =
    await Promise.all([
      prisma.user.count({
        where: {
          role: 'user',
          isActive: true,
        },
      }),
      prisma.user.count({
        where: {
          role: 'mentor',
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
      prisma.kelas.count({
        where: {
          isActive: true
        }
      }),
      prisma.kelas.findMany({
        where: {
          isActive: true,
        },
        take: 5,
        select: {
          kelas_id: true,
          nama_kelas: true,
          anggota: {
            select: {          // pastikan ini select, bukan include
              user: {
                select: {      // tidak ada where di sini
                  user_id: true,
                  role: true,
                },
              },
            },
          },
        },
      }),
    ]);

console.log(JSON.stringify(kelasAktif, null, 2)); // debug

const formattedKelasAktif = kelasAktif.map((kelas) => ({
  kelas_id: kelas.kelas_id,
  nama_kelas: kelas.nama_kelas,
  total_peserta: kelas.anggota.filter((a) => a.user?.role === 'user').length,
}));

  return {
    jumlah_peserta: jumlahPeserta,
    jumlah_mentor: jumlahMentor,
    jumlah_kelas: jumlahKelas,
    jumlah_pertemuan: jumlahPertemuan,
    kelas_aktif: formattedKelasAktif,
  };
}