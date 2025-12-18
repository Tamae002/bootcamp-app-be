// src/controllers/dashboard/dashboard.controller.js

import { getDashboardStats } from '../../services/dashboard/dashboard.service.js';

export async function getDashboardStatsHandler(req, res) {
  try {
    const stats = await getDashboardStats();
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}