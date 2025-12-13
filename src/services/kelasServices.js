import prisma from '../config/prisma.js';


//Create kelas
export const createKelas = async (data) => {
  return prisma.kelas.create({
    data,
  });
};

//Get all kelas with pagination
export const getAllKelas = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const total = await prisma.kelas.count({ where: { isActive: true } });
  const data = await prisma.kelas.findMany({
    where: { isActive: true },
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  const totalPages = Math.ceil(total / limit);
  const currentPage = parseInt(page);
  const hasNextPage = currentPage < totalPages;

  return {
    data,
    meta: {
      total,
      page: currentPage,
      lastPage: totalPages,
      limit: parseInt(limit),
      has_next_page: hasNextPage,
    },
  };
};

//Get kelas by ID with pertemuan
export const getKelasById = async (kelas_id) => {
  return prisma.kelas.findUnique({
    where: { kelas_id, isActive: true },
    include: {
      pertemuan: {
        where: { isActive: true },
        orderBy: { tanggal: 'asc' },
      },
    },
  });
};

//Update kelas
export const updateKelas = async (kelas_id, data) => {
  return prisma.kelas.update({
    where: { kelas_id, isActive: true },
    data,
  });
};

//Delete kelas
export const deleteKelas = async (kelas_id) => {
  return prisma.kelas.update({
    where: { kelas_id, isActive: true },
    data: { isActive: false },
  });
};