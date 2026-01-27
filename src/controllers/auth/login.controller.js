import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV } = process.env;

  const user = await prisma.user.findUnique({
    where: { email: email },
    include: {
      sessions: {
        take: 1
      }
    }
  });
  if (!user) {
    const error = new Error('Username salah')
    error.statusCode = 400
    throw error
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error('Password salah');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // Simpan session di DB
  await prisma.session.upsert({
    where: {
      session_id: user.sessions?.[0]?.session_id || '-',
    },
    create: {
      user_id: user.user_id,
      token,
      isActive: true
    },
    update: {
      token: token,
      isActive: true,
    }
  });

  // Kirim token sebagai cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production" || NODE_ENV === "staging",
    sameSite: NODE_ENV === "development" ? "Lax" : "None",
  });

  res.json({ message: "Login berhasil" });
};
