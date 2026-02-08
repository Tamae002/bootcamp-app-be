import { createJawabanService, getJawabanByPertemuanService } from '../services/jawaban.service.js';
import { beriNilaiJawabanService } from '../services/jawaban.service.js';

export const beriNilaiJawaban = async (req, res, next) => {
  const { jawaban_id } = req.params;
  const { nilai } = req.body;

  const result = await beriNilaiJawabanService(jawaban_id, nilai);
  res.json(result);
};

export const createJawaban = async (req, res, next) => {
  try {
    const { pertemuan_id } = req.params;

    const { jawaban } = req.body; // bisa array atau object
    const user_id = req.userId;
    const { file_path, deskripsi } = req.body;
    console.log(jawaban)

    const result = await createJawabanService({ file_path, deskripsi }, pertemuan_id, user_id);
    
    res.status(201).json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    next(error);
  }
};

// Get Jawaban by Pertemuan
export const getJawabanByPertemuan = async (req, res, next) => {
  try {
    const { pertemuan_id } = req.params;
    
    const result = await getJawabanByPertemuanService(pertemuan_id);
    
    res.status(200).json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    next(error);
  }
};