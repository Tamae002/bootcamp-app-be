import { z } from 'zod';

// Get dashboard stats schema
export const getDashboardStatsSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
