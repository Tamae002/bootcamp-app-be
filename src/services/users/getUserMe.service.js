// src/services/users/getUserMe.service.js
import prisma from '../../config/prisma.js';

export const getUserMeService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      user_id: true,
      email: true,
      name: true,
      role: true,
      gambar: true,
      isActive: true,
    }
  });

  // Pisahkan pengecekan user ada atau tidak, dengan pengecekan user aktif atau tidak.
  // Ini memberikan pesan error yang lebih jelas.
  if (!user || !user.isActive) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  // Hapus properti `isActive` dari objek yang dikembalikan ke controller
  const { isActive, ...userData } = user;
  return userData;
};