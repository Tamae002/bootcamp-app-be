import { Router } from 'express';
import { createJawaban, getJawabanByPertemuan } from '../controllers/jawaban.controller.js';
import { beriNilaiJawaban } from '../controllers/jawaban.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/checkRole.middleware.js';

const router = Router();

router.patch('/:jawaban_id/nilai', authMiddleware, checkRole(["mentor"]), beriNilaiJawaban);
router.post('/:pertemuan_id', authMiddleware, checkRole(["user"]), createJawaban);
router.get('/:pertemuan_id', authMiddleware, checkRole(["admin", "mentor"]),getJawabanByPertemuan);

export default router;