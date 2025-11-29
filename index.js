// 1. Impor package express
const express = require('express');

// 2. Buat instance dari aplikasi express
const app = express();

// 3. Tentukan port yang akan digunakan
const port = 3000;

// 4. Buat sebuah "route" atau alamat URL
// Ketika seseorang mengakses alamat utama ('/'), server akan merespon
app.get('/', (req, res) => {
  res.send('Halo Dunia! Server Express saya berjalan!');
});

// 5. Jalankan server agar mendengarkan permintaan di port yang ditentukan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
