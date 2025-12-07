-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "jawaban_status_enum" AS ENUM ('menunggu', 'dinilai');

-- CreateTable
CREATE TABLE "User" (
    "user_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "user_role_enum" NOT NULL,
    "gambar" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "Kelas_id" VARCHAR(36) NOT NULL,
    "nama_kelas" VARCHAR(255) NOT NULL,
    "deskripsi" VARCHAR(255) NOT NULL,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_berakhir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("Kelas_id")
);

-- CreateTable
CREATE TABLE "Pertemuan" (
    "Pertemuan_id" VARCHAR(36) NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi_tugas" VARCHAR(255) NOT NULL,
    "kelas_id" VARCHAR(36) NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pertemuan_pkey" PRIMARY KEY ("Pertemuan_id")
);

-- CreateTable
CREATE TABLE "anggota_Kelas" (
    "anggota_kelas_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "kelas_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "anggota_Kelas_pkey" PRIMARY KEY ("anggota_kelas_id")
);

-- CreateTable
CREATE TABLE "Jawaban" (
    "Jawaban_id" VARCHAR(36) NOT NULL,
    "pertemuan_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,
    "nilai" INTEGER NOT NULL DEFAULT 0,
    "status" "jawaban_status_enum" NOT NULL,

    CONSTRAINT "Jawaban_pkey" PRIMARY KEY ("Jawaban_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "token" VARCHAR(255) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pertemuan_kelas_id_judul_key" ON "Pertemuan"("kelas_id", "judul");

-- CreateIndex
CREATE UNIQUE INDEX "anggota_Kelas_user_id_kelas_id_key" ON "anggota_Kelas"("user_id", "kelas_id");

-- CreateIndex
CREATE UNIQUE INDEX "Jawaban_pertemuan_id_user_id_key" ON "Jawaban"("pertemuan_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_token_key" ON "ResetPasswordToken"("token");

-- CreateIndex
CREATE INDEX "ResetPasswordToken_userId_idx" ON "ResetPasswordToken"("userId");

-- CreateIndex
CREATE INDEX "ResetPasswordToken_token_idx" ON "ResetPasswordToken"("token");

-- AddForeignKey
ALTER TABLE "Pertemuan" ADD CONSTRAINT "Pertemuan_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("Kelas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_Kelas" ADD CONSTRAINT "anggota_Kelas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_Kelas" ADD CONSTRAINT "anggota_Kelas_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("Kelas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban" ADD CONSTRAINT "Jawaban_pertemuan_id_fkey" FOREIGN KEY ("pertemuan_id") REFERENCES "Pertemuan"("Pertemuan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban" ADD CONSTRAINT "Jawaban_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
