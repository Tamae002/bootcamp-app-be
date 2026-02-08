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
router.post('/', checkRole(['mentor', 'admin']), validate(createPertemuanSchema), createPertemuanHandler);
router.put('/:id', checkRole(['mentor', 'admin']), validate(updatePertemuanSchema), updatePertemuanHandler);

// DELETE - NO VALIDATION
router.delete('/:id', checkRole(['mentor', 'admin']), deletePertemuanHandler);

export default router;