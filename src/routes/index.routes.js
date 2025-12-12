import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import jawabanRoutes from './jawaban.routes.js'; // ← tambahkan ini

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/jawaban', jawabanRoutes); // ← daftarkan

export default router; // ✅ export router gabungan