// src/controllers/users/getUserMe.controller.js
import jwt from 'jsonwebtoken';
import { getUserMeService } from '../../services/users/getUserMe.service.js';

export const getUserMe = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const user = await getUserMeService(userId);

  res.status(200).json({
    success: true,
    message: 'User data retrieved successfully',
    data: user
  });
};