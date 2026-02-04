import prisma from "../config/prisma.js";

const sanitizeJawaban = (jawaban) => {
  const { ...safe } = jawaban;
  return safe;
};

// Update nilai jawaban
export const beriNilaiJawabanService = async (jawabanId, nilai) => {
  if (nilai == null || nilai < 0 || nilai > 100) {
    throw new Error("Nilai harus angka antara 0–100");
  }

  const jawaban = await prisma.jawaban.update({
    where: {
      jawaban_id: jawabanId,
      isActive: true,
    },
    data: {
      nilai,
      status: "dinilai",
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
      pertemuan: {
        select: { judul: true },
      },
    },
  });

  return sanitizeJawaban(jawaban);
};

// Create atau Update jawaban (1 user = 1 jawaban per pertemuan)
export const createJawabanService = async (data, pertemuan_id, user_id) => {
  return prisma.$transaction(async (tx) => {
    // Cek pertemuan exist
    const pertemuan = await tx.pertemuan.findUnique({
      where: { pertemuan_id },
    });

    if (!pertemuan) {
      throw new Error("Pertemuan tidak ditemukan");
    }

    // Cek apakah user sudah punya jawaban di pertemuan ini
    const existingJawaban = await tx.jawaban.findUnique({
      where: {
        pertemuan_id_user_id: {
          pertemuan_id,
          user_id,
        },
      },
    });

    let jawaban;

    if (existingJawaban) {
      // Update jawaban yang sudah ada
      jawaban = await tx.jawaban.update({
        where: {
          jawaban_id: existingJawaban.jawaban_id,
        },
        data: {
          file_path: data.file_path,
          deskripsi: data.deskripsi || null,
          status: "menunggu", // reset status ke menunggu kalau di-update
          nilai: null, // reset nilai
        },
        include: {
          user: {
            select: { name: true, email: true },
          },
          pertemuan: {
            select: { judul: true },
          },
        },
      });
    } else {
      // Create jawaban baru
      jawaban = await tx.jawaban.create({
        data: {
          pertemuan_id,
          user_id,
          file_path: data.file_path,
          deskripsi: data.deskripsi || null,
          status: "menunggu",
          nilai: null,
        },
        include: {
          user: {
            select: { name: true, email: true },
          },
          pertemuan: {
            select: { judul: true },
          },
        },
      });
    }

    return sanitizeJawaban(jawaban);
  });
};

export const getJawabanByPertemuanService = async (pertemuan_id) => {
  const jawaban = await prisma.jawaban.findMany({
    where: { pertemuan_id, isActive: true },
    include: {
      user: {
        select: { name: true, email: true, gambar: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jawaban.map(sanitizeJawaban);
};