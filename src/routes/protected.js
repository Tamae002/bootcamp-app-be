import express from "express";
import { profileController } from "../controllers/auth/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", authMiddleware, profileController);

export default router;
