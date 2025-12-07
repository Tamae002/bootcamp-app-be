const express = require('express');

const exampleRoutes = require('./src/routes/example');

const app = express();

const port = 3000;

app.use(express.json());

app.use('/api', exampleRoutes);

app.get('/', (req, res) => {
  res.send('Halo Dunia! Server Express saya berjalan!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
