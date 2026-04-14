import { Router } from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
  getUserMe,
  getUserKelas,
  updateUser,
  deleteUser,
  updateProfile,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/checkRole.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
} from '../validations/user.validation.js';

const router = Router();

// GET - NO VALIDATION
router.get('/me/kelas', authMiddleware, getUserKelas);
router.get('/me', authMiddleware, getUserMe);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// PUT - WITH VALIDATION (edit profile sendiri)
router.put('/me/profile', authMiddleware, validate(updateProfileSchema), updateProfile);

// POST, PUT - WITH VALIDATION
router.post('/', checkRole(['mentor', 'admin', 'superadmin']), validate(createUserSchema), createUser); // tambahkan superadmin
router.put('/:id', checkRole(['mentor', 'admin', 'superadmin']), validate(updateUserSchema), updateUser); // tambahkan superadmin

// DELETE - NO VALIDATION
router.delete('/:id', checkRole(['mentor', 'admin', 'superadmin']), deleteUser); // tambahkan superadmin

export default router;