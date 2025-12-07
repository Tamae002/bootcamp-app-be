const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function resetPasswordHandler(req, res) {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Password baru dan konfirmasi wajib diisi" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password baru minimal 6 karakter" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Konfirmasi password tidak cocok" });
  }

  const resetToken = await prisma.resetPasswordToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    return res.status(404).json({ message: "Token tidak ditemukan" });
  }

  if (resetToken.expiresAt < new Date()) {
    return res.status(410).json({ message: "Token sudah expired" });
  }

  const user = await prisma.user.findUnique({
    where: { user_id: resetToken.userId },
  });

  const isSame = bcrypt.compareSync(newPassword, user.password);
  if (isSame) {
    return res.status(400).json({ message: "Password baru tidak boleh sama dengan yang lama" });
  }

  const hashed = bcrypt.hashSync(newPassword, 10);

  await prisma.user.update({
    where: { user_id: user.user_id },
    data: { password: hashed },
  });

  await prisma.resetPasswordToken.delete({
    where: { token },
  });

  return res.json({ message: "Password berhasil direset" });
}

module.exports = resetPasswordHandler;