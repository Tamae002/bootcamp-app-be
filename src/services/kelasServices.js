import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();

/**
 * Helper: Ambil anggota kelas (mentor & peserta)
 * @param {string} kelas_id
 * @param {PrismaClient} client - Bisa tx atau prisma instance
 */
const getAnggotaKelas = async (kelas_id, client = prisma) => {
  const anggota = await client.anggota_kelas.findMany({
    where: { kelas_id },
    include: {
      user: {
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true,
          gambar: true,
        },
      },
    },
  });

  const validAnggota = anggota.filter(a => a.user !== null);

  const list_mentor = validAnggota
    .filter(a => ['admin', 'mentor'].includes(a.user.role))
    .map(a => a.user);

  const list_peserta = validAnggota
    .filter(a => ['user'].includes(a.user.role))
    .map(a => a.user);

  return { list_mentor, list_peserta };
};

//Create Kelas + Anggota
export const createKelasWithAnggota = async (data, added_users = []) => {
  return prisma.$transaction(async (tx) => {
    const kelasData = {
      ...data,
      tanggal_mulai: data.tanggal_mulai ? new Date(data.tanggal_mulai) : null,
      tanggal_berakhir: data.tanggal_berakhir ? new Date(data.tanggal_berakhir) : null,
    };

    // Buat kelas
    const kelas = await tx.kelas.create({ data: kelasData });

    // Tambah anggota jika ada
    if (added_users?.length > 0) {
      const anggotaData = added_users.map(user_id => ({
        user_id,
        kelas_id: kelas.kelas_id,
      }));

      await tx.anggota_kelas.createMany({
        data: anggotaData,
        skipDuplicates: true,
      });
    }

    // Ambil data lengkap menggunakan tx agar konsisten
    const { list_mentor, list_peserta } = await getAnggotaKelas(kelas.kelas_id, tx);
    return { ...kelas, list_mentor, list_peserta };
  });
};

//Get All Kelas (admin = semua, mentor = hanya kelas yang diikuti)
export const getAllKelas = async ({ page = 1, limit = 10, search, role, user_id }) => {
  const skip = (page - 1) * limit;

  // kalau mentor, filter hanya kelas yang dia ikuti
  const whereFilter = role === 'mentor'
    ? {
      anggota: {
        some: {
          user_id: user_id,
        },
      },
       ...(search && {
      OR: [
        { nama_kelas: { contains: search, mode: 'insensitive' } },
        { deskripsi: { contains: search, mode: 'insensitive' } }
      ]
    })
    }
    : {
      ...(search && {
        OR: [
          { nama_kelas: { contains: search, mode: 'insensitive' } },
          { deskripsi: { contains: search, mode: 'insensitive' } }
        ]
      })
    }; // admin tidak ada filter, lihat semua

  const [total, data] = await Promise.all([
    prisma.kelas.count({ where: whereFilter }),
    prisma.kelas.findMany({
      where: whereFilter,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
  ]);


  const totalPages = Math.ceil(total / limit);
  const currentPage = parseInt(page);
  const hasNextPage = currentPage < totalPages;

  return {
    data,
    meta: {
      total,
      page: currentPage,
      lastPage: totalPages,
      limit: parseInt(limit),
      has_next_page: hasNextPage,
    },
  };
};

//Get Kelas by ID + Anggota + Pertemuan
export const getKelasByIdWithAnggota = async (kelas_id) => {
  const kelas = await prisma.kelas.findUnique({
    where: { kelas_id },
    include: {
      pertemuan: {
        orderBy: { tanggal: 'asc' },
      },
    },
  });

  if (!kelas) return null;

  const { list_mentor, list_peserta } = await getAnggotaKelas(kelas_id);
  return { ...kelas, list_mentor, list_peserta };
};

//Update Kelas + Manage Anggota (Hard Delete removed_users + jawaban)
export const updateKelasWithAnggota = async (kelas_id, data, added_users = [], removed_users = []) => {
  return prisma.$transaction(async (tx) => {

    // ✅ Convert tanggal ke DateTime (cuma convert kalo ada)
    const kelasUpdateData = { ...data };

    if (kelasUpdateData.tanggal_mulai) {
      kelasUpdateData.tanggal_mulai = new Date(kelasUpdateData.tanggal_mulai);
    }

    if (kelasUpdateData.tanggal_berakhir) {
      kelasUpdateData.tanggal_berakhir = new Date(kelasUpdateData.tanggal_berakhir);
    }

    // Update kelas
    const kelas = await tx.kelas.update({
      where: { kelas_id: kelas_id },
      data: kelasUpdateData,
    });

    // Tambah anggota baru
    if (added_users?.length > 0) {
      const anggotaData = added_users.map(user_id => ({
        user_id,
        kelas_id: kelas_id,
      }));
      await tx.anggota_kelas.createMany({
        data: anggotaData,
        skipDuplicates: true,
      });
    }

    if (removed_users?.length > 0) {
      await tx.anggota_kelas.deleteMany({
        where: {
          kelas_id: kelas_id,
          user_id: { in: removed_users },
        },
      });
    }

    // Hard delete removed_users + jawaban terkait
    if (removed_users?.length > 0) {
      // Ambil semua pertemuan di kelas ini
      const pertemuanIds = await tx.pertemuan.findMany({
        where: { kelas_id },
        select: { pertemuan_id: true },
      });
      const pertemuanIdList = pertemuanIds.map(p => p.pertemuan_id);

      // Hapus jawaban terkait
      if (pertemuanIdList.length > 0) {
        await tx.jawaban.deleteMany({
          where: {
            pertemuan_id: { in: pertemuanIdList },
            user_id: { in: removed_users },
          },
        });
      }

      // Hapus anggota_kelas
      await tx.anggota_kelas.deleteMany({
        where: {
          kelas_id,
          user_id: { in: removed_users },
        },
      });
    }

    // Ambil data terbaru
    const { list_mentor, list_peserta } = await getAnggotaKelas(kelas_id, tx);
    return { ...kelas, list_mentor, list_peserta };
  });
};

//Hard Delete Kelas + Semua Data Terkait
export const deleteKelasCascade = async (kelas_id) => {
  return prisma.$transaction(async (tx) => {
    //Ambil pertemuan untuk hapus jawaban
    const pertemuanIds = await tx.pertemuan.findMany({
      where: { kelas_id },
      select: { pertemuan_id: true },
    });
    const pertemuanIdList = pertemuanIds.map(p => p.pertemuan_id);

    // Hapus semua jawaban terkait
    if (pertemuanIdList.length > 0) {
      await tx.jawaban.deleteMany({
        where: { pertemuan_id: { in: pertemuanIdList } },
      });
    }

    // Hard delete pertemuan, anggota, lalu kelas
    await tx.pertemuan.deleteMany({ where: { kelas_id } });
    await tx.anggota_kelas.deleteMany({ where: { kelas_id } });
    const kelas = await tx.kelas.delete({ where: { kelas_id } });

    return kelas;
  });
};