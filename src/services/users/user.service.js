import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';

const saltRounds = 10;

const sanitizeUser = (user) => {
  const { password, ...safe } = user;
  return safe;
};

export const createUserService = async (data) => {
  const { email, password, role, name, gambar } = data;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      name,
      gambar,
    },
  });
  return sanitizeUser(user);
};

export const getUserByIdService = async (id) => {
  const user = await prisma.user.findUnique({
    where: { user_id: id },
  });
  if (!user) return null;
  return sanitizeUser(user);
};

export const getAllUsersService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        gambar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getUserMeService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  if (!user) return null;
  return sanitizeUser(user);
};

export const updateUserService = async (id, data) => {
  const { email, password, role, name, gambar, isActive } = data;

  // Passwordnya di hash dulu
  let updatedData = {
      ...(email !== undefined && { email }),
      ...(role !== undefined && { role }),
      ...(name !== undefined && { name }),
      ...(gambar !== undefined && { gambar }),
      ...(isActive !== undefined && { isActive }),
    };

    if (password !== undefined) {
    updatedData.password = await bcrypt.hash(password, saltRounds);
  }
  
  const user = await prisma.user.update({
    where: { user_id: id },
    data: updatedData,
  });
return sanitizeUser(user);
};

export const deleteUserService = async (id) => {
  await prisma.user.delete({
    where: { user_id: id },
  });
};