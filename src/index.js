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
import axios from 'axios';
import * as cheerio  from 'cheerio';

// Import Middleware
import errorHandler from './middleware/errorHandler.middlewares.js';

// Import Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/index.js';

const app = express();

const extractMetadata = (html, url) => {
  const $ = cheerio.load(html);
  
  // Extract Open Graph tags (preferred by most sites)
  const metadata = {
    url: url,
    title: 
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      '',
    description:
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '',
    image:
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('link[rel="image_src"]').attr('href') ||
      '',
    siteName:
      $('meta[property="og:site_name"]').attr('content') ||
      new URL(url).hostname,
    favicon:
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      `${new URL(url).origin}/favicon.ico`
  };

  // Make image URL absolute if it's relative
  if (metadata.image && !metadata.image.startsWith('http')) {
    const urlObj = new URL(url);
    metadata.image = metadata.image.startsWith('/')
      ? `${urlObj.origin}${metadata.image}`
      : `${urlObj.origin}/${metadata.image}`;
  }

  return metadata;
};

/**
 * GET /api/link-preview?url=<URL>
 * Fetches metadata for a given URL
 */



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
        defaultModelsExpandDepth: -1 
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
app.get('/link-preview', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
      },
      timeout: 10000, // 10 second timeout
      maxRedirects: 5,
    });

    // Extract metadata
    const metadata = extractMetadata(response.data, url);

    // Cache the result (optional - add Redis/memory cache here)
    res.json(metadata);
  } catch (error) {
    console.error('Error fetching link preview:', error.message);
    res.status(500).json({
      error: 'Failed to fetch link preview',
      message: error.message,
    });
  }
});
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