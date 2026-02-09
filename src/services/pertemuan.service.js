// src/services/pertemuan.service.js
import prisma from '../config/prisma.js';

// CREATE
export async function createPertemuan(data) {
  const { kelas_id, ...rest } = data; // Ekstrak kelas_id
  
  return prisma.pertemuan.create({
    data: {
      // Gunakan relasi nested untuk kelas
      kelas: {
        connect: {
          kelas_id: kelas_id
        }
      },
      ...rest,
      isActive: true,
    },
  });
}

// READ ALL
export async function getAllPertemuan() {
  return prisma.pertemuan.findMany({
    where: { isActive: true },
    orderBy: { tanggal: 'desc' },
  });
}

// READ BY ID + JAWABAN
export async function getPertemuanById(pertemuan_id) {
  return prisma.pertemuan.findFirst({
    where: { pertemuan_id, isActive: true },
    include: {
      jawaban: {
        where: { isActive: true },
        select: {
          jawaban_id: true,
          user_id: true,
          file_path: true,
          nilai: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' }, 
      },
    },
  });
}

// UPDATE
export async function updatePertemuan(pertemuan_id, data) {
  const { kelas_id, ...rest } = data;
  
  const updateData = { ...rest };
  
  // Jika ada kelas_id dalam data update, gunakan relasi nested
  if (kelas_id !== undefined) {
    updateData.kelas = {
      connect: {
        kelas_id: kelas_id
      }
    };
  }
  
  return prisma.pertemuan.update({
    where: { pertemuan_id, isActive: true },
     updateData,
  });
}

// DELETE
export async function deletePertemuan(pertemuan_id) {
  return prisma.pertemuan.delete({
    where: { pertemuan_id: pertemuan_id},
  });
}