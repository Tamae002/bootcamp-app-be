import { Router } from 'express';
import {
  createPertemuanHandler,
  getAllPertemuanHandler,
  getPertemuanByIdHandler,
  updatePertemuanHandler,
  deletePertemuanHandler,
} from '../controllers/pertemuan.controller.js';
import checkRole from '../middleware/checkRole.middleware.js';

const router = Router();

router.post('/', checkRole(['mentor']),createPertemuanHandler);          // CREATE
router.get('/', getAllPertemuanHandler);           // LIST ALL
router.get('/:id', getPertemuanByIdHandler);       // GET BY ID + JAWABAN
router.put('/:id', checkRole(['mentor']), updatePertemuanHandler);        // UPDATE
router.delete('/:id', checkRole(['mentor']), deletePertemuanHandler);     // DELETE

export default router;