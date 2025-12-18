import { Router } from 'express';
import { beriNilaiJawaban } from '../controllers/jawaban/jawaban.controller.js';

const router = Router();

// PATCH /jawaban/:jawaban_id/nilai
router.patch('/:jawaban_id/nilai', beriNilaiJawaban);

export default router;