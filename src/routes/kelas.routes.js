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

export const kelasRoutes = Router();

// GET - NO VALIDATION
kelasRoutes.get('/', checkRole(['mentor', 'admin', 'superadmin']), getAllKelas); // tambahkan superadmin
kelasRoutes.get('/:id', getKelasById);

// POST, PATCH - WITH VALIDATION
kelasRoutes.post('/', checkRole(['mentor', 'admin', 'superadmin']), validate(createKelasSchema), createKelas); // tambahkan superadmin
kelasRoutes.patch('/:id', checkRole(['mentor', 'admin', 'superadmin']), validate(updateKelasSchema), updateKelas); // tambahkan superadmin

// DELETE - NO VALIDATION
kelasRoutes.delete('/:id', checkRole(['mentor', 'admin', 'superadmin']), deleteKelas); // tambahkan superadmin