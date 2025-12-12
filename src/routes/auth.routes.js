import { Router } from 'express';
import express from 'express';
import { loginController } from "../controllers/auth/login.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";
import { forgotPassword, forgotPasswordValidation } from '../controllers/auth/forgotPassword.controller.js';
import { resetPasswordController } from '../controllers/auth/resetPassword.controller.js';

const router = Router();

router.post('/login', loginController);
router.get('/logout', logoutController);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password/:token', resetPasswordController);

export default router; 