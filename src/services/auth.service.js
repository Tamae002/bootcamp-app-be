import prisma from '../config/prisma.js';
import { generateUUID } from '../utils/uuid.js';
import { hashPassword } from '../utils/password.js';

async function generateResetTokenForEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error(`Email ${email} tidak ditemukan di database`);
  }

  const token = generateUUID();
  const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

  const created = await prisma.reset_password_token.create({
    data: {
      user_id: user.user_id,   // ✅ gunakan ID dari user
      token,
      expires_at,
    },
  });

  return created;
}

async function verifyResetToken(token) {
  const resetToken = await prisma.reset_password_token.findFirst({
    where: { token },
    include: { user: true },
  });
  if (!resetToken) return null;
  if (resetToken.expires_at.getTime() < Date.now()) return null;
  return { user: resetToken.user, resetToken };
}

async function updatePasswordAndDeleteToken(userId, newPasswordPlain, token) {
  const hashed = await hashPassword(newPasswordPlain);

  // Use transaction to ensure atomicity
  const result = await prisma.$transaction([
    prisma.user.update({
      where: { user_id: userId },
      data: { password: hashed },
    }),
    prisma.reset_password_token.delete({
      where: { token },
    }),
  ]);

  return !!result?.length;
}

export {
  generateResetTokenForEmail,
  verifyResetToken,
  updatePasswordAndDeleteToken,
};