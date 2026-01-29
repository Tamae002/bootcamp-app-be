import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';

import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from './routes/index.routes.js';
import https from "https";
import fs from "fs";

// Import Middleware
import errorHandler from './middleware/errorHandler.middlewares.js';

// Import Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/index.js';

const app = express();

// Debug Swagger Spec
if (process.env.NODE_ENV !== 'production') {
  console.log('🔍 Swagger Spec Debug:');
  console.log('  - Paths:', Object.keys(swaggerSpec.paths || {}).length);
  console.log('  - Schemas:', Object.keys(swaggerSpec.components?.schemas || {}).length);
  console.log('  - Tags:', swaggerSpec.tags?.length || 0);
}

// Swagger UI - Hanya di development
if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        defaultModelsExpandDepth: -1 // Sembunyikan schemas di sidebar
      },
      customCss: `
        .swagger-ui .topbar {
          background-color: #1a237e;
        }
        .swagger-ui .scheme-container {
          background-color: #e8eaf6;
        }
        .swagger-ui .opblock-section-header {
          background-color: #3949ab;
          color: white;
        }
        .swagger-ui .btn.execute {
          background-color: #4caf50;
        }
        .swagger-ui .btn.execute:hover {
          background-color: #45a049;
        }
        .swagger-ui .opblock-tag {
          background-color: #000000;
        }
      `,
      customSiteTitle: 'Bootcamp App API Docs'
    })
  );

  // Endpoint untuk download spesifikasi OpenAPI JSON
  app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

app.use(cors({
  origin: process.env.CORS_BYPASS?.split(",") || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/file', express.static(path.join(process.cwd(), 'file')));
app.use(routes);

// app.use(notFound);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; text-align: center;">
      <h1>🚀 API Berjalan</h1>
      <p>Sistem Pembelajaran API</p>
      <div style="margin-top: 30px;">
        <a href="/api-docs" style="display: inline-block; padding: 12px 24px; background-color: #1a237e; color: white; text-decoration: none; border-radius: 5px; margin: 10px;">
          📄 Buka Dokumentasi API
        </a>
        <a href="/api-docs-json" style="display: inline-block; padding: 12px 24px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px; margin: 10px;">
          📥 Download OpenAPI Spec
        </a>
      </div>
      <div style="margin-top: 40px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
        <h3>Endpoint Utama:</h3>
        <ul style="text-align: left; display: inline-block;">
          <li><code>POST /auth/login</code> - Login</li>
          <li><code>POST /auth/register</code> - Registrasi</li>
          <li><code>GET /user</code> - Daftar Pengguna</li>
          <li><code>GET /kelas</code> - Daftar Kelas</li>
          <li><code>GET /pertemuan</code> - Daftar Pertemuan</li>
        </ul>
      </div>
    </div>
  `);
});

const { SSL_KEY, SSL_CERT } = process.env;

const httpsOptions = {
  key: SSL_KEY && fs.readFileSync(SSL_KEY),
  cert: SSL_CERT && fs.readFileSync(SSL_CERT),
};

const PORT = process.env.PORT || 3000;

if (httpsOptions.key && httpsOptions.cert)
  https.createServer(httpsOptions, app).listen(PORT, process.env.HOST, () => {
    const protocol = SSL_KEY && SSL_CERT ? 'https' : 'http';
    console.log(`✅ Server berjalan di ${protocol}://localhost:${PORT}`);
    console.log(`📄 Swagger UI: ${protocol}://localhost:${PORT}/api-docs`);
    console.log(`📡 API Base URL: ${protocol}://localhost:${PORT}`);
  });
else
  app.listen(PORT, process.env.HOST, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
    console.log(`📄 Swagger UI: http://localhost:${PORT}/api-docs`);
    console.log(`📡 API Base URL: http://localhost:${PORT}`);
  });