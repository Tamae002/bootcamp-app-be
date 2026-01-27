import prisma from "../../config/prisma.js";

export const logoutController = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error("Token tidak ditemukan");
    error.statusCode = 400;
    throw error;
  }

  await prisma.session.updateMany({
    where: { token },
    data: { isActive: false }
  });

  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

  res.json({ message: "Logout berhasil" });
};
