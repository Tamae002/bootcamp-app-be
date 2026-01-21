import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  getUserMeService,
  updateUserService,
  deleteUserService,
} from '../../services/users/user.service.js';

export const createUser = async (req, res) => {
  try {

const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password minimal 8 karakter' });
    }

    const user = await createUserService(req.body);
    res.status(201).json(user);

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdService(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  const { page, limit, search, role} = req.query;

  const validroles = ['admin', 'mentor', 'user'];
  if (role && !validroles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
}

const result = await getAllUsersService({ page, limit, search, role });
  res.json(result);
};

export const getUserMe = async (req, res) => {
  const user = await getUserMeService(req.userId); // dari middleware
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    if (password !== undefined && password.length < 8) {
      return res.status(400).json({ error: 'Password minimal 8 karakter' });
    }

    const user = await updateUserService(id, req.body);
    res.json(user);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: error.message });
  }
};