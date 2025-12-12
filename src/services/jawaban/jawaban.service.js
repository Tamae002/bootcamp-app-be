import prisma from '../../config/prisma.js';

// Helper: sanitasi output
const sanitizeJawaban = (jawaban) => {
  const { ...safe } = jawaban;
  return safe;
};

// Update nilai jawaban
export const beriNilaiJawabanService = async (jawabanId, nilai) => {
  // Validasi nilai
  if (nilai == null || nilai < 0 || nilai > 100) {
    throw new Error('Nilai harus angka antara 0–100');
  }

// Update jawaban
const jawaban = await prisma.jawaban.update({
  where: {
    jawaban_id: jawabanId,
    isActive: true,
  },
  data: { // ← 🔑 ini yang kurang!
    nilai,
    status: 'sudah_dinilai', // sesuai enum: jawaban_status_enum
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
}