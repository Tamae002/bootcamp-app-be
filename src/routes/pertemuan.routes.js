import { Router } from 'express';
import {
  createPertemuanHandler,
  getAllPertemuanHandler,
  getPertemuanByIdHandler,
  updatePertemuanHandler,
  deletePertemuanHandler,
} from '../controllers/pertemuan/pertemuan.controller.js';

const router = Router();

router.post('/', createPertemuanHandler);          // CREATE
router.get('/', getAllPertemuanHandler);           // LIST ALL
router.get('/:id', getPertemuanByIdHandler);       // GET BY ID + JAWABAN
router.put('/:id', updatePertemuanHandler);        // UPDATE
router.delete('/:id', deletePertemuanHandler);     // SOFT DELETE

export default router;