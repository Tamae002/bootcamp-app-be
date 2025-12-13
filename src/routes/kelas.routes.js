import express from 'express';
import {
  createKelas,
  getAllKelas,
  getKelasById,
  updateKelas,
  deleteKelas,
} from '../controllers/kelasController.js';
export const kelasRoutes = express.Router();

kelasRoutes.post('/', createKelas);
kelasRoutes.get('/', getAllKelas);
kelasRoutes.get('/:id', getKelasById);
kelasRoutes.patch('/:id', updateKelas);
kelasRoutes.delete('/:id', deleteKelas);
