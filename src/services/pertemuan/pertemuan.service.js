import prisma from '../../config/prisma.js';

// CREATE
export async function createPertemuan(data) {
  return prisma.pertemuan.create({
    data: {
      ...data,
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
      },
    },
  });
}

// UPDATE
export async function updatePertemuan(pertemuan_id, data) {
  return prisma.pertemuan.update({
    where: { pertemuan_id, isActive: true },
    data,
  });
}

// DELETE (soft delete)
export async function deletePertemuan(pertemuan_id) {
  return prisma.pertemuan.update({
    where: { pertemuan_id, isActive: true },
    data: { isActive: false },
  });
}