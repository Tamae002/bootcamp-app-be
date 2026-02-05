import { Router } from 'express';
import {
  loginController,
  logoutController,
  forgotPassword,
  resetPasswordController,
} from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validations/auth.validation.js';

const router = Router();

// POST - WITH VALIDATION
router.post('/login', validate(loginSchema), loginController);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPasswordController);

// GET/POST - NO VALIDATION (logout biasanya tidak butuh body)
router.post('/logout', logoutController);

export default router;