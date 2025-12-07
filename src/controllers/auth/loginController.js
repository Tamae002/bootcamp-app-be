import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ message: "Username salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.id }, "SECRETKEY", { expiresIn: "1d" });

    // Simpan session di DB
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isActive: true
      }
    });

    // Kirim token sebagai cookie
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });

    res.json({ message: "Login berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error pada server" });
  }
};
