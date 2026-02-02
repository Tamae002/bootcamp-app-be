import { Router } from 'express';
import express from 'express';
import { loginController, logoutController, forgotPassword, forgotPasswordValidation, resetPasswordController } from "../controllers/auth.controller.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', loginController);
router.get('/logout', logoutController);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password/:token', resetPasswordController);

export default router; 