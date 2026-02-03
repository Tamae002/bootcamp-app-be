import { uploadFileService } from '../services/file.service.js';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No file uploaded');
    error.statusCode = 400;
    throw error;
  }

  const fileUrl = await uploadFileService(req.file);
  return res.status(201).json({ message: 'File uploaded', fileUrl });
};

export const uploadMultipleFiles = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    const error = new Error('No files uploaded');
    error.statusCode = 400;
    throw error;
  }

  const fileUrls = await Promise.all(
    req.files.map(file => uploadFileService(file))
  );

  return res.status(201).json({
    message: `${req.files.length} file(s) uploaded successfully`,
    count: req.files.length,
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