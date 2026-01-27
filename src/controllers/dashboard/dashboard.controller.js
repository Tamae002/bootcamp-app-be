// src/controllers/dashboard/dashboard.controller.js

import { getDashboardStats } from '../../services/dashboard/dashboard.service.js';

export async function getDashboardStatsHandler(req, res, next) {
  const stats = await getDashboardStats();
  return res.status(200).json(stats);
}