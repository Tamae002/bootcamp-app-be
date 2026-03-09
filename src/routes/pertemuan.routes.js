import { Router } from 'express';
import {
  createPertemuanHandler,
  getAllPertemuanHandler,
  getPertemuanByIdHandler,
  updatePertemuanHandler,
  deletePertemuanHandler,
} from '../controllers/pertemuan.controller.js';
import checkRole from '../middleware/checkRole.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createPertemuanSchema,
  updatePertemuanSchema,
} from '../validations/pertemuan.validation.js';

const router = Router();

// GET - NO VALIDATION
router.get('/', getAllPertemuanHandler);
router.get('/:id', getPertemuanByIdHandler);

// POST, PUT - WITH VALIDATION
router.post('/', checkRole(['mentor', 'admin', 'superadmin']), validate(createPertemuanSchema), createPertemuanHandler); // tambahkan superadmin
router.put('/:id', checkRole(['mentor', 'admin', 'superadmin']), validate(updatePertemuanSchema), updatePertemuanHandler); // tambahkan superadmin

// DELETE - NO VALIDATION
router.delete('/:id', checkRole(['mentor', 'admin', 'superadmin']), deletePertemuanHandler); // tambahkan superadmin

export default router;