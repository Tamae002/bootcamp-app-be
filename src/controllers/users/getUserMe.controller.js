// src/controllers/users/getUserMe.controller.js
import jwt from 'jsonwebtoken';
import { getUserMeService } from '../../services/users/getUserMe.service.js';

export const getUserMe = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log('test', token)
    console.log('test2', decoded)

    const user = await getUserMeService(userId);

    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: user
    });
  } catch (error) {
    console.error('getUserMe error:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Menggunakan statusCode dari error yang dilempar oleh service
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};