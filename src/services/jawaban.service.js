import prisma from "../config/prisma.js";

const sanitizeJawaban = (jawaban) => {
  const { ...safe } = jawaban;
  return safe;
};

// Update nilai jawaban
export const beriNilaiJawabanService = async (jawabanId, nilai) => {
  // Validasi nilai
  if (nilai == null || nilai < 0 || nilai > 100) {
    throw new Error("Nilai harus angka antara 0–100");
  }

  // Update jawaban
  const jawaban = await prisma.jawaban.update({
    where: {
      jawaban_id: jawabanId,
      isActive: true,
    },
    data: {
      // ← 🔑 ini yang kurang!
      nilai,
      status: "dinilai", // sesuai enum: jawaban_status_enum
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

export const createJawabanService = async (data, pertemuan_id, user_id) => {
  return prisma.$transaction(async (tx) => {
    const jawabanArray = Array.isArray(data) ? data : [data];

    // Cek pertemuan exist aja (tanpa validasi anggota kelas)
    const pertemuan = await tx.pertemuan.findUnique({
      where: { pertemuan_id },
    });

    if (!pertemuan) {
      throw new Error("Pertemuan tidak ditemukan");
    }

    // Prepare data jawaban
    const jawabanData = jawabanArray.map((item) => (
      console.log(item), {
      pertemuan_id,
      user_id,
      file_path: item.file_path,
      status: "menunggu", // 👈 sesuai database (bukan 'dinilai')
      nilai: null,
    }));

    // Create many jawaban
    await tx.jawaban.createMany({
      data: jawabanData,
      skipDuplicates: true,
    });

    // Ambil jawaban yang baru dibuat
    const createdJawaban = await tx.jawaban.findMany({
      where: {
        pertemuan_id,
        user_id,
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
        pertemuan: {
          select: { judul: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: jawabanArray.length,
    });

    return createdJawaban.map(sanitizeJawaban);
  });
};

export const getJawabanByPertemuanService = async (pertemuan_id) => {
  const jawaban = await prisma.jawaban.findMany({
    where: { pertemuan_id },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jawaban.map(sanitizeJawaban);
};
