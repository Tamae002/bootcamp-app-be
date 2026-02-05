import { Router } from 'express';
import { getDashboardStatsHandler } from '../controllers/dashboard.controller.js';
import checkRole from '../middleware/checkRole.middleware.js';

const router = Router();

// GET - NO VALIDATION
router.get(
  '/',
  checkRole(['admin', 'mentor']),
  getDashboardStatsHandler
);

export default router;