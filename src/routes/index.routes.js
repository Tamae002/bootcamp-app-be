import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import jawabanRoutes from './jawaban.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import fileRoutes from './file.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/jawaban', jawabanRoutes); 
router.use('/dashboard', dashboardRoutes); 
router.use('/api/file', fileRoutes);

export default router;