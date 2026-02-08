import { Router } from 'express';
import { createJawaban, getJawabanByPertemuan, beriNilaiJawaban } from '../controllers/jawaban.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/checkRole.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createJawabanSchema,
  beriNilaiSchema,
} from '../validations/jawaban.validation.js';

const router = Router();

// GET - NO VALIDATION
router.get(
  '/:pertemuan_id',
  authMiddleware,
  checkRole(['admin', 'mentor']),
  getJawabanByPertemuan
);

// PATCH - WITH VALIDATION
router.patch(
  '/:jawaban_id/nilai',
  authMiddleware,
  checkRole(['mentor']),
  validate(beriNilaiSchema),
  beriNilaiJawaban
);

// POST - WITH VALIDATION
router.post(
  '/:pertemuan_id',
  authMiddleware,
  checkRole(['user']),
  validate(createJawabanSchema),
  createJawaban
);

export default router;