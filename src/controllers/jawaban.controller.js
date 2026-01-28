import { beriNilaiJawabanService } from '../services/jawaban.service.js';

export const beriNilaiJawaban = async (req, res, next) => {
  const { jawaban_id } = req.params;
  const { nilai } = req.body;

  const result = await beriNilaiJawabanService(jawaban_id, nilai);
  res.json(result);
};