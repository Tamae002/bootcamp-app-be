-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('admin', 'teacher', 'student', 'user');

-- CreateEnum
CREATE TYPE "jawaban_status_enum" AS ENUM ('menunggu nilai', 'sudah dinilai', 'menunggu', 'dinilai');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "StatusJawaban" AS ENUM ('menunggu', 'dinilai');

-- CreateTable
CREATE TABLE "user" (
    "user_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "user_role_enum" NOT NULL,
    "gambar" VARCHAR(255),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "kelas" (
    "Kelas_id" VARCHAR(36) NOT NULL,
    "nama_kelas" VARCHAR(255) NOT NULL,
    "gambar" VARCHAR(255),
    "deskripsi" VARCHAR(255),
    "tanggal_mulai" TIMESTAMP(6),
    "tanggal_berakhir" TIMESTAMP(6),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("Kelas_id")
);

-- CreateTable
CREATE TABLE "pertemuan" (
    "Pertemuan_id" VARCHAR(36) NOT NULL,
    "kelas_id" VARCHAR(36),
    "judul" VARCHAR(255) NOT NULL,
    "tanggal" TIMESTAMP(6) NOT NULL,
    "deskripsi_tugas" VARCHAR(255),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pertemuan_pkey" PRIMARY KEY ("Pertemuan_id")
);

-- CreateTable
CREATE TABLE "anggota_kelas" (
    "anggota_kelas_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "kelas_id" VARCHAR(36) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anggota_kelas_pkey" PRIMARY KEY ("anggota_kelas_id")
);

-- CreateTable
CREATE TABLE "jawaban" (
    "Jawaban_id" VARCHAR(36) NOT NULL,
    "pertemuan_id" VARCHAR(36),
    "user_id" VARCHAR(36),
    "file_path" VARCHAR(255),
    "nilai" SMALLINT,
    "status" "jawaban_status_enum" DEFAULT 'menunggu nilai',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jawaban_pkey" PRIMARY KEY ("Jawaban_id")
);

-- CreateTable
CREATE TABLE "session" (
    "session_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36),
    "token" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "reset_password_token" (
    "id_rp_token" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "reset_password_token_pkey" PRIMARY KEY ("id_rp_token")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_nama_kelas_unique" ON "kelas"("nama_kelas");

-- CreateIndex
CREATE UNIQUE INDEX "anggota_Kelas_uniquekey" ON "anggota_kelas"("user_id", "kelas_id");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_token_key" ON "reset_password_token"("token");

-- AddForeignKey
ALTER TABLE "pertemuan" ADD CONSTRAINT "Pertemuan_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "kelas"("Kelas_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anggota_kelas" ADD CONSTRAINT "anggota_Kelas_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "kelas"("Kelas_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anggota_kelas" ADD CONSTRAINT "anggota_Kelas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jawaban" ADD CONSTRAINT "Jawaban_pertemuan_id_fkey" FOREIGN KEY ("pertemuan_id") REFERENCES "pertemuan"("Pertemuan_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jawaban" ADD CONSTRAINT "Jawaban_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reset_password_token" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
