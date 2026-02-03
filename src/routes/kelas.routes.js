import express from 'express';
import {
  createKelas,
  getAllKelas,
  getKelasById,
  updateKelas,
  deleteKelas,
} from '../controllers/kelasController.js';
import checkRole from '../middleware/checkRole.middleware.js';
export const kelasRoutes = express.Router();

kelasRoutes.post('/', checkRole(['mentor', 'admin']), createKelas);
kelasRoutes.get('/', checkRole(['mentor', 'admin']), getAllKelas); 
kelasRoutes.get('/:id', getKelasById);
kelasRoutes.patch('/:id', checkRole(['mentor', 'admin']), updateKelas);
kelasRoutes.delete('/:id', checkRole(['mentor', 'admin']), deleteKelas);
