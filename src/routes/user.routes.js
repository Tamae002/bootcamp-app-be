import { Router } from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
  getUserMe,
  getUserKelas,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/checkRole.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createUserSchema,
  updateUserSchema,
} from '../validations/user.validation.js';

const router = Router();

// GET - NO VALIDATION
router.get('/me/kelas', authMiddleware, getUserKelas);
router.get('/me', authMiddleware, getUserMe);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// POST, PUT - WITH VALIDATION
router.post('/', checkRole(['mentor', 'admin']), validate(createUserSchema), createUser);
router.put('/:id', checkRole(['mentor', 'admin']), validate(updateUserSchema), updateUser);

// DELETE - NO VALIDATION
router.delete('/:id', checkRole(['mentor', 'admin']), deleteUser);

export default router;