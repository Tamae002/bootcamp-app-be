import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from './routes/index.routes.js';
import https from "https";
import fs from "fs";

const app = express();

app.use(cors({
  origin: process.env.CORS_BYPASS?.split(",") || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

// Default route
app.get("/", (req, res) => {
  res.send("API Berjalan 🚀 Silakan tes /auth/login");
});

const { SSL_KEY, SSL_CERT } = process.env;

const httpsOptions = {
  key: SSL_KEY && fs.readFileSync(SSL_KEY),
  cert: SSL_CERT && fs.readFileSync(SSL_CERT),
};

const PORT = process.env.PORT || 3000;

if (httpsOptions.key && httpsOptions.cert)
  https.createServer(httpsOptions, app).listen(PORT, process.env.HOST, () => console.log(`Server berjalan di https://localhost:${PORT}`));
else
  app.listen(PORT, process.env.HOST, () => console.log(`Server berjalan di http://localhost:${PORT}`));
