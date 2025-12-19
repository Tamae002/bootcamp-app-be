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

export const getAllUsersService = async ({ page = 1, limit = 10, search, role } = {}) => {
  const where = {
    isActive: true,
    ...(role && { role }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    })
  };

  const skip = (page - 1) * limit;
  const take = Number(limit);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take,
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
    prisma.user.count({ where }),
  ]);

  return {
    users,
    meta: {
      page: Number(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
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