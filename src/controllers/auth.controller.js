import { body, validationResult } from "express-validator";
import { generateResetTokenForEmail } from "../services/auth.service.js"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// From forgotPassword.controller.js
export const forgotPasswordValidation = [
  body("email").isEmail().withMessage("Email tidak valid"),
];

export async function forgotPassword(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validasi gagal");
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }

  const { email } = req.body;

  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    const error = new Error("Konfigurasi server tidak lengkap");
    error.statusCode = 500;
    throw error;
  }

  // Generate token & simpan ke DB
  const result = await generateResetTokenForEmail(email);

  if (!result) {
    return res.json({
      message: "Jika email terdaftar, link reset password telah dikirim. Periksa inbox Anda.",
    });
  }

  const resetLink = `${frontendUrl}/reset-password/${result.token}`;

  // Setup transporter email
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.RESEND_USERNAME,
      pass: process.env.RESEND_PASSWORD,
    },
  });

  // Kirim email
  await transporter.sendMail({
    from: "bootcampapps@bootcamp.raihankr.my.id",
    to: email,
    subject: "Reset Password Akun Anda",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto;">
          <h2>Permintaan Reset Password</h2>
          <p>Klik tombol di bawah untuk mengatur ulang password Anda:</p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
            Atur Ulang Password
          </a>
          <p>Link ini berlaku selama <strong>15 menit</strong>.</p>
          <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
        </div>
      `,
  });

  return res.json({
    message: "Jika email terdaftar, link reset password telah dikirim. Periksa inbox Anda.",
  });
}

// From login.controller.js
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

// From logout.controller.js
export const logoutController = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error("Token tidak ditemukan");
    error.statusCode = 400;
    throw error;
  }

  await prisma.session.updateMany({
    where: { token },
    data: { isActive: false }
  });

  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

  res.json({ message: "Logout berhasil" });
};

// From resetPassword.controller.js
export async function resetPasswordController(req, res, next) {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    const error = new Error("Password baru dan konfirmasi wajib diisi");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error("Password baru minimal 6 karakter");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword !== confirmPassword) {
    const error = new Error("Konfirmasi password tidak cocok");
    error.statusCode = 400;
    throw error;
  }

  const resetToken = await prisma.reset_password_token.findFirst({
    where: { token },
  });

  if (!resetToken) {
    const error = new Error("Token tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  if (resetToken.expires_at < new Date()) {
    const error = new Error("Token sudah expired");
    error.statusCode = 410;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { user_id: resetToken.user_id },
  });

  if (!user) {
    const error = new Error("User tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  const isSame = bcrypt.compareSync(newPassword, user.password);
  if (isSame) {
    const error = new Error("Password baru tidak boleh sama dengan yang lama");
    error.statusCode = 400;
    throw error;
  }

  const hashed = bcrypt.hashSync(newPassword, 10);

  await prisma.user.update({
    where: { user_id: user.user_id },
    data: { password: hashed },
  });

  await prisma.reset_password_token.delete({
    where: {
      id: resetToken.id,
    },
  });

  return res.json({ message: "Password berhasil direset" });
}