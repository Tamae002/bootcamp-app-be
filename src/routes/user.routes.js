import { Router } from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
  getUserMe,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/checkRole.middleware.js';

const router = Router();

router.get('/me', authMiddleware, getUserMe);
router.post('/', checkRole(['mentor', 'admin']), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', checkRole(['mentor', 'admin']), updateUser);
router.delete('/:id', checkRole(['mentor', 'admin']), deleteUser);

export default router;