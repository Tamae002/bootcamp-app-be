import { Router } from 'express';
import { getDashboardStatsHandler } from '../controllers/dashboard.controller.js';
import checkRole from '../middleware/checkRole.middleware.js';

const router = Router();

router.get(
  '/',
  checkRole(['admin', 'mentor', 'superadmin']), // tambahkan superadmin
  getDashboardStatsHandler
);

export default router;