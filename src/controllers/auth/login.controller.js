import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        sessions: {
          take: 1
        }
      }
    });
    if (!user) return res.status(400).json({ message: "Username salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Simpan session di DB
    await prisma.session.upsert({
      where: {
        session_id: user.sessions?.[0]?.session_id || null,
      },
      create: {
        user_id: user.user_id,
        token,
        isActive: true
      },
      update: {
        token: token
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
