import { uploadFileService } from '../services/file.service.js';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No file uploaded');
    error.statusCode = 400;
    throw error;
  }

  const nama = req.body.nama; // tambahkan ini

  if (!nama) {
    const error = new Error('Nama file is required');
    error.statusCode = 400;
    throw error;
  }

  const fileUrl = await uploadFileService(req.file, nama);
  return res.status(201).json({ message: 'File uploaded', nama, fileUrl });
};

export const uploadMultipleFiles = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    const error = new Error('No files uploaded');
    error.statusCode = 400;
    throw error;
  }

  const nama = req.body.nama; // ambil nama dari frontend

  if (!nama) {
    const error = new Error('Nama file is required');
    error.statusCode = 400;
    throw error;
  }

  const fileUrls = await Promise.all(
    req.files.map((file, index) =>
          uploadFileService(file, nama + (req.files.length > 1 ? `_${index + 1}` : ''))
          // kalau lebih dari 1 file, nama akan jadi nama_1, nama_2, dst.
        )
      );

  return res.status(201).json({
    message: `${req.files.length} file(s) uploaded successfully`,
    count: req.files.length,
    nama,
    urls: fileUrls
  });
};

export const serveIt = (req, res, next) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'file', filename);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    const error = new Error('File not found');
    error.statusCode = 404;
    throw error;
  }
};