import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Tidak ada token, silakan login" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await prisma.session.findFirst({
      where: { token, user_id: decoded.id, isActive: true }
    });

    if (!session) return res.status(401).json({ message: "Session tidak valid" });

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};