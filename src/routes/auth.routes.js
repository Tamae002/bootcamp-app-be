import express from 'express';
import { loginController } from "../controllers/auth/login.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";
import { forgotPassword, forgotPasswordValidation } from '../controllers/auth/forgotPassword.controller.js';
import { resetPasswordController } from '../controllers/auth/resetPassword.controller.js';
export const authRoutes = express.Router();

authRoutes.post('/login', loginController)
authRoutes.get('/logout', logoutController)
authRoutes.post('/forgot-password', forgotPasswordValidation, forgotPassword);
authRoutes.post("/reset-password/:token", resetPasswordController);