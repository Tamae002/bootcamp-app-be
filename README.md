bootcamp-app-be
Panduan Setup Backend Bootcamp App

Panduan lengkap untuk menjalankan aplikasi backend bootcamp dari awal hingga siap digunakan.

📋 Prasyarat

Pastikan sudah terinstall di sistem Anda:

- Node.js versi 22.20.0 (gunakan node --version untuk mengecek)
- npm (otomatis terinstall dengan Node.js)
- PostgreSQL database yang sudah running
- Git untuk clone repository
- Text editor (VS Code, Sublime, atau lainnya)

🚀 Step-by-Step Setup

Step 1: Clone Repository dari GitHub
Buka terminal/command prompt, lalu jalankan:

```bash
git clone https://github.com/Tamae002/bootcamp-app-be.git
```
Masuk ke folder project:

```bash
cd bootcamp-app-be
```
Step 2: Install Dependencies

Install semua package yang dibutuhkan:

```bash
npm install
```
Proses ini akan menginstall semua dependencies yang terdaftar di package.json. Tunggu hingga selesai.

Step 3: Setup Environment Variables

Buat file .env dari template yang sudah ada:

Untuk Windows:
```bash
copy .env.example .env
```
Untuk Linux/Mac:
```bash
cp .env.example .env
```
Edit file .env yang baru dibuat. Sesuaikan dengan konfigurasi Anda:

dotenv
PORT=3000

HOSTNAME=localhost

NODE_ENV=development

DATABASE_URL="postgresql://postgres:(password)@(hostname):(port)/(database)?schema=public"

JWT_SECRET=examplejwtsecret

ADMIN_EMAIL=admin@example.com

ADMIN_PASSWORD=passwordexample

USER_PW_PREFIX=userpwexample

FRONTEND_URL=http://localhost:5173

Step 4: Verifikasi Koneksi Database

Sebelum melanjutkan, pastikan PostgreSQL sudah running dan database bootcamp_geek sudah dibuat.

Cara mengecek database:

1. Buka terminal PostgreSQL:
   ```bash
   psql -U postgres
   ```
2. Masukkan password Anda (jordan)

3. Cek daftar database:
   sql
   \l
   
4. Jika bootcamp_geek belum ada, buat database baru:
   sql
   CREATE DATABASE bootcamp_geek;
   
5. Keluar dari PostgreSQL:
   sql
   \q
   
Step 5: Setup Prisma (Database Schema)

Prisma adalah ORM yang digunakan aplikasi ini. Jalankan perintah berikut untuk setup database schema:

Generate Prisma Client:
```bash
npx prisma generate
```
Jalankan Migration (membuat tabel di database):
```bash
npx prisma migrate dev
```
Jika diminta memberi nama migration, ketik nama yang deskriptif seperti: init atau initial_setup

Alternatif - Push Schema (tanpa migration files):
```bash
npx prisma db push
```
Step 6: Seed Database (Opsional)

Jika aplikasi memiliki seed data untuk mengisi database awal, jalankan:

```bash
npx prisma db seed
```
Catatan: Jika terjadi error bahwa seed tidak dikonfigurasi, skip step ini. Anda bisa mengisi data manual nanti.

Perintah ini akan membuka Prisma Studio di browser (biasanya http://localhost:5555), dimana Anda bisa melihat tabel dan data di database.

Step 7: Jalankan Development Server

Saatnya menjalankan aplikasi backend:

```bash
npm run dev
```
Jika berhasil, Anda akan melihat pesan seperti:

Server running on http://localhost:3000

Cara mengetes apakah backend sudah running:

Buka browser dan akses:

http://localhost:3000

Atau gunakan tools seperti Postman/Thunder Client untuk testing API endpoints.

🔧 Troubleshooting

Masalah 1: Error "Cannot connect to database"

Penyebab: Database belum running atau konfigurasi DATABASE_URL salah

Solusi:
1. Pastikan PostgreSQL service sudah running
2. Cek kembali DATABASE_URL di file .env
3. Pastikan username, password, dan nama database benar
4. Cek port PostgreSQL (default: 5432)

Masalah 2: Error saat npm install

Penyebab: Versi Node.js tidak kompatibel atau masalah network

Solusi:
1. Cek versi Node.js: node --version (harus v22.20.0)
2. Clear npm cache: npm cache clean --force
3. Hapus folder node_modules dan file package-lock.json
4. Install ulang: npm install

Masalah 3: Prisma generate error

Penyebab: Schema Prisma ada masalah atau dependencies belum terinstall

Solusi:
1. Pastikan npm install sudah selesai dengan baik
2. Cek file prisma/schema.prisma tidak ada error syntax
3. Jalankan: npx prisma format untuk format schema
4. Generate ulang: npx prisma generate

Masalah 4: Port 3000 sudah digunakan

Penyebab: Ada aplikasi lain yang menggunakan port 3000

Solusi:
1. Ubah PORT di file .env menjadi port lain (misal 3001, 8000, dll)
2. Atau matikan aplikasi yang menggunakan port 3000

📝 Perintah-Perintah Penting

Install dependencies
```bash 
npm install
```
Jalankan development server
```bash
npm run dev
```
Generate Prisma Client
```bash
npx prisma generate
```
Jalankan migration
```bash
npx prisma migrate dev
```
Push schema ke database (tanpa migration)
```bash
npx prisma db push
``` 
Reset database (HATI-HATI: menghapus semua data)
```bash
npx prisma migrate reset
```
 🗂️ Struktur Project

bootcamp-app-be/
├── prisma/              Folder schema database dan migrations
│   └── schema.prisma    File definisi schema database
├── src/                 Source code aplikasi
├── .env                 File konfigurasi environment (JANGAN di-commit ke Git)
├── .env.example         Template file environment
├── package.json         Dependencies dan scripts
├── index.js             Entry point aplikasi
└── README.md            Dokumentasi project

✅ Checklist Setup Sukses

Repository berhasil di-clone
Dependencies terinstall (npm install berhasil)
File .env sudah dibuat dan dikonfigurasi
Database PostgreSQL sudah running
Database bootcamp_geek sudah dibuat
Prisma generate berhasil
Migration/push schema berhasil
Server bisa dijalankan dengan npm run dev
Bisa mengakses http://localhost:3000

📚 Resources

- Repository: https://github.com/Tamae002/bootcamp-app-be
- Prisma Documentation: https://www.prisma.io/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs/

💡 Tips

1. Selalu jalankan npx prisma generate setelah mengubah schema.prisma
2. Gunakan Prisma Studio (npx prisma studio) untuk melihat dan edit data dengan mudah
3. Jangan commit file .env ke Git (sudah ada di .gitignore)
4. Backup database sebelum menjalankan prisma migrate reset
5. Gunakan environment variables untuk konfigurasi yang berbeda (development/production)

🆘 Bantuan Lebih Lanjut

Jika masih mengalami masalah:

1. Cek file Developer Manual.txt di repository untuk dokumentasi tambahan
2. Cek logs error di terminal untuk informasi detail
3. Pastikan semua prasyarat sudah terpenuhi
4. Coba restart PostgreSQL service dan server aplikasi

Selamat! Backend Anda sudah siap digunakan! 🎉