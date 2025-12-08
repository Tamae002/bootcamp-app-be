import prisma from "../../config/prisma.js";

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "Token tidak ditemukan" });

    await prisma.session.updateMany({
      where: { token },
      data: { isActive: false }
    });

    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

    res.json({ message: "Logout berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error pada server" });
  }
};
