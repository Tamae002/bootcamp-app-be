import { Router } from 'express';
import {
  createKelas,
  getAllKelas,
  getKelasById,
  updateKelas,
  deleteKelas,
} from '../controllers/kelasController.js';
import checkRole from '../middleware/checkRole.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createKelasSchema,
  updateKelasSchema,
} from '../validations/kelas.validation.js';

export const kelasRoutes = express.Router();

// GET - NO VALIDATION
kelasRoutes.get('/', checkRole(['mentor', 'admin']), getAllKelas);
kelasRoutes.get('/:id', getKelasById);

// POST, PATCH - WITH VALIDATION
kelasRoutes.post('/', checkRole(['mentor', 'admin']), validate(createKelasSchema), createKelas);
kelasRoutes.patch('/:id', checkRole(['mentor', 'admin']), validate(updateKelasSchema), updateKelas);

// DELETE - NO VALIDATION
kelasRoutes.delete('/:id', checkRole(['mentor', 'admin']), deleteKelas);