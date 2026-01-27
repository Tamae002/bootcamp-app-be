import bcrypt from 'bcrypt'
import prisma from "../../config/prisma.js";

async function resetPasswordController(req, res, next) {
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

export { resetPasswordController }