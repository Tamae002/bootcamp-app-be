// src/services/homeService.js
import prisma from '../config/prisma.js';

export const getHomePageData = async (user_id) => {
  // Ambil max 10 kelas yang diikuti user
  const kelasList = await prisma.kelas.findMany({
    where: {
      anggota: {
        some: {
          user_id: user_id
        }
      }
    },
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      kelas_id: true,
      nama_kelas: true,
      deskripsi: true,
      gambar: true,
      tanggal_mulai: true,
      tanggal_berakhir: true,
      createdAt: true,
      updatedAt: true
    }
  });

  // Ambil pertemuan mendatang dari kelas-kelas tersebut
  const kelasIds = kelasList.map(k => k.kelas_id);
  let pertemuanMendatang = [];
  
  if (kelasIds.length > 0) {
    pertemuanMendatang = await prisma.pertemuan.findMany({
      where: {
        kelas_id: { in: kelasIds },
        tanggal: { gte: new Date() },
        isActive: true
      },
      orderBy: { tanggal: 'asc' },
      select: {
        pertemuan_id: true,
        judul: true,
        tanggal: true,
        deskripsi_tugas: true,
        kelas_id: true
      }
    });
  }

  return {
    kelas_terdaftar: kelasList,
    pertemuan_mendatang: pertemuanMendatang
  };
};