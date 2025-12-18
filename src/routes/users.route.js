import { Router } from 'express';
import { getUserMe } from '../controllers/users/getUserMe.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me', getUserMe)

export default router;