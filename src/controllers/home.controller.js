import { getHomePageData } from '../services/home.service.js';

export const getHomePage = async (req, res) => {
  try {
    const user_id = req.userId;

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: 'User tidak terautentikasi',
      });
    }

    const data = await getHomePageData(user_id);
    return res.status(200).json({
      success: true,
       data,
    });
  } catch (error) {
    console.error('Error di getHomePage:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data homepage',
    });
  }
};