import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log("User sudah ada:", username);
    return;
  }

  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: { username, password: hash, fullname: "Administrator" }
  });

  console.log("Admin dibuat!");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
