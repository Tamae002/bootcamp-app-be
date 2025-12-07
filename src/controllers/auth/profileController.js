import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const profileController = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    res.json({ username: user.username, fullname: user.fullname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error pada server" });
  }
};
