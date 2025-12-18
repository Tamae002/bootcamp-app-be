import { beriNilaiJawabanService } from '../../services/jawaban/jawaban.service.js';

export const beriNilaiJawaban = async (req, res) => {
  const { jawaban_id } = req.params;
  const { nilai } = req.body;

  try {
    const result = await beriNilaiJawabanService(jawaban_id, nilai);
    res.json(result);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Jawaban tidak ditemukan atau tidak aktif' });
    }
    if (error.message.includes('Nilai harus angka')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error memberi nilai:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memberi nilai' });
  }
};