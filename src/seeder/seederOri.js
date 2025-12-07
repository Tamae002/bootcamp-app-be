const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let saltRounds = 10;

async function createAdminAccount() {
  if (!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD)) {
    throw new Error(
      "Missing environment variables: ADMIN_EMAIL, ADMIN_PASSWORD"
    );
  }

const admin = await prisma.user.upsert({
  where: { email: process.env.ADMIN_EMAIL },
  update: {},
  create: {
    name: "Administrator",
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, saltRounds),
    role: "admin",
    gambar: null,
  },
});

  console.log(` Admin created: ${admin.email} (${admin.user_id})`);
  return admin;
}

async function createUsers(count) {
  if (!process.env.USER_PW_PREFIX) {
    throw new Error("Missing USER_PW_PREFIX in environment");
  }

  const users = [];
  for (let i = 1; i <= count; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: bcrypt.hashSync(process.env.USER_PW_PREFIX + i, saltRounds),
        role: "user",
        gambar: null,
      },
    });
    users.push(user);
    console.log(` User created: ${user.email} (${user.user_id})`);
  }
  return users;
}

async function createHabibAccount() {
  const habib = await prisma.user.upsert({
    where: { email: "habibiarkanuljidan@gmail.com" },
    update: {},
    create: {
      name: "Habib",
      email: "habibiarkanuljidan@gmail.com",
      password: bcrypt.hashSync("HabibPass123", 10), // ganti dengan password yang kamu mau
      role: "user",
      gambar: null,
    },
  });
  console.log(`Habib account created: ${habib.email} (${habib.user_id})`);
  return habib;
}

async function createKelas() {
  const kelasData = [
    {
      nama_kelas: "Pemrograman Web Dasar",
      deskripsi: "Belajar dasar-dasar pemrograman web menggunakan HTML, CSS, JavaScript.",
      tanggal_mulai: new Date("2025-01-10"),
      tanggal_berakhir: new Date("2025-03-10"),
    },
    {
      nama_kelas: "Machine Learning Fundamental",
      deskripsi: "Memahami konsep dasar machine learning dan penerapannya.",
      tanggal_mulai: new Date("2025-02-01"),
      tanggal_berakhir: new Date("2025-04-01"),
    },
  ];

  const kelasList = {};
  for (let k of kelasData) {

    let existing = await prisma.kelas.findFirst({
      where: { nama_kelas: k.nama_kelas }
    });

    if (existing) {
      kelasList[existing.nama_kelas] = existing;
      console.log(` Kelas already exists: ${existing.nama_kelas} (${existing.kelas_id})`);
    } else {
      const result = await prisma.kelas.create({ data: k });
      kelasList[result.nama_kelas] = result;
      console.log(` Kelas created: ${result.nama_kelas} (${result.kelas_id})`);
    }
  }
  return kelasList;
}

async function createPertemuan(kelasList) {
  const pertemuanData = [
    {
      judul: "Pertemuan 1: Pengenalan HTML",
      deskripsi_tugas: "Buat halaman sederhana menggunakan HTML.",
      kelas_id: kelasList["Pemrograman Web Dasar"].kelas_id,
      tanggal: new Date("2025-01-15"),
    },
    {
      judul: "Pertemuan 2: CSS Styling",
      deskripsi_tugas: "Styling halaman HTML dengan CSS.",
      kelas_id: kelasList["Pemrograman Web Dasar"].kelas_id,
      tanggal: new Date("2025-01-22"),
    },
    {
      judul: "Pertemuan 1: Pengenalan ML",
      deskripsi_tugas: "Install Python dan library scikit-learn.",
      kelas_id: kelasList["Machine Learning Fundamental"].kelas_id,
      tanggal: new Date("2025-02-05"),
    },
  ];

  const pertemuanList = {};
  for (let p of pertemuanData) {
    const result = await prisma.pertemuan.upsert({
      where: {
        kelas_id_judul: {
          kelas_id: p.kelas_id,
          judul: p.judul
        }
      },
      update: {},
      create: p,
    });
    pertemuanList[result.judul] = result;
    console.log(` Pertemuan created/updated: ${result.judul} (${result.pertemuan_id})`);
  }
  return pertemuanList;
}

async function createAnggotaKelas(users, kelasList) {
  const anggotaData = [];

  for (let user of users) {
    for (let kelas of Object.values(kelasList)) {
      anggotaData.push({
        user_id: user.user_id,
        kelas_id: kelas.kelas_id,
      });
    }
  }

  for (let data of anggotaData) {
    const result = await prisma.anggota_kelas.upsert({
      where: {
        user_id_kelas_id: {
          user_id: data.user_id,
          kelas_id: data.kelas_id,
        },
      },
      update: {},
      create: data,
    });
    console.log(` User ${result.user_id} joined class ${result.kelas_id}`);
  }
}

async function createJawaban(users, pertemuanList) {
  const jawabanData = [];

  for (let user of users) {
    for (let pertemuan of Object.values(pertemuanList)) {
      jawabanData.push({
        pertemuan_id: pertemuan.pertemuan_id,
        user_id: user.user_id,
        file_path: `/uploads/jawaban_${user.user_id}_${pertemuan.pertemuan_id}.pdf`,
        nilai: Math.floor(Math.random() * 101), 
        status: Math.random() > 0.5 ? "dinilai" : "menunggu", 
      });
    }
  }

  for (let data of jawabanData) {
    const result = await prisma.jawaban.upsert({
      where: {
        pertemuan_id_user_id: {
          pertemuan_id: data.pertemuan_id,
          user_id: data.user_id,
        },
      },
      update: {},
      create: data,
    });
    console.log(` Jawaban submitted by User ${result.user_id} for Pertemuan ${result.pertemuan_id}`);
  }
}

async function main() {
  console.log("Starting database seeding...");

  const admin = await createAdminAccount();

  if (process.env.NODE_ENV !== "development") {
    console.log("Seeding skipped for production environment.");
    return;
  }

  const habib = await createHabibAccount();

  const users = await createUsers(2);

  const kelasList = await createKelas();

  const pertemuanList = await createPertemuan(kelasList);

  await createAnggotaKelas(users, kelasList);

  await createJawaban(users, pertemuanList);

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeder error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });