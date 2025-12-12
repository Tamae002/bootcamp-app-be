import { Router } from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
  getMe,
  updateUser,
  deleteUser,
} from '../controllers/users/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/me', authMiddleware, getMe);

export default router;