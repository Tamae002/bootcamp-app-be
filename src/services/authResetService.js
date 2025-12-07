const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateUUID } = require('../utils/uuid');
const { hashPassword } = require('../utils/password');

async function generateResetTokenForEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error(`Email ${email} tidak ditemukan di database`);
  }

  const token = generateUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

  const created = await prisma.resetPasswordToken.create({
    data: {
      userId: user.user_id,   // ✅ gunakan ID dari user
      token,
      expiresAt,
    },
  });

  return created;
}

async function verifyResetToken(token) {
  const resetToken = await prisma.resetPasswordToken.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!resetToken) return null;
  if (resetToken.expiresAt.getTime() < Date.now()) return null;
  return { user: resetToken.user, resetToken };
}

async function updatePasswordAndDeleteToken(userId, newPasswordPlain, token) {
  const hashed = await hashPassword(newPasswordPlain);

  // Use transaction to ensure atomicity
  const result = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    }),
    prisma.resetPasswordToken.delete({
      where: { token },
    }),
  ]);

  return !!result?.length;
}

module.exports = {
  generateResetTokenForEmail,
  verifyResetToken,
  updatePasswordAndDeleteToken,
};