import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  getUserMeService,
  updateUserService,
  deleteUserService,
  getUserKelasService, 
} from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    const error = new Error('Password is required');
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error('Password minimal 8 karakter');
    error.statusCode = 400;
    throw error;
  }

  const user = await createUserService(req.body);
  res.status(201).json(user);
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserByIdService(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(user);
};

export const getAllUsers = async (req, res, next) => {
  const { page, limit, search, role } = req.query;

  const validroles = ['admin', 'mentor', 'user'];
  const filteredRole = role && validroles.includes(role) ? role : undefined;

  const result = await getAllUsersService({ page, limit, search, role: filteredRole });
  
  // ✅ Return hanya users, tanpa meta
  res.json({ users: result.users });
};

export const getUserMe = async (req, res, next) => {
  const user = await getUserMeService(req.userId); // dari middleware
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(user);
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  if (password !== undefined && password.length < 8) {
    const error = new Error('Password minimal 8 karakter');
    error.statusCode = 400;
    throw error;
  }

  const user = await updateUserService(id, req.body);
  res.json(user);
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  await deleteUserService(id);
  res.status(204).send();
};

export const getUserKelas = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const user_id = req.userId; // dari middleware authMiddleware

  const result = await getUserKelasService({
    page: parseInt(page),
    limit: parseInt(limit),
    user_id,
  });

  res.json({ success: true, ...result });
};