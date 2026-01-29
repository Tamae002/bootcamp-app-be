import express from 'express'

import { kelasRoutes } from './kelas.routes.js'
import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import jawabanRoutes from './jawaban.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import fileRoutes from './file.routes.js';
import pertemuanRoutes from './pertemuan.routes.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use('/kelas', authMiddleware, kelasRoutes);
router.use('/auth', authRoutes);
router.use('/user', authMiddleware, userRoutes);
router.use('/jawaban', authMiddleware, jawabanRoutes); 
router.use('/dashboard', authMiddleware, dashboardRoutes); 
router.use('/api/file', authMiddleware, fileRoutes);
router.use('/pertemuan', authMiddleware, pertemuanRoutes);

export default router;