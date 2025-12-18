import { Router } from 'express';
import { getDashboardStatsHandler } from '../controllers/dashboard/dashboard.controller.js';

const router = Router();

// Karena di-mount sebagai `/dashboard`, maka path di sini cukup `/stats`
router.get('/stats', getDashboardStatsHandler);

export default router;