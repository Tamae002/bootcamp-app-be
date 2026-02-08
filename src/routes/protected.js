import express from "express";
import { getUserMe } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", authMiddleware, getUserMe);

export default router;
