import { uploadFileService } from '../services/file.service.js';
import path from 'path';
import fs from 'fs';


export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = await uploadFileService(req.file);
    return res.status(201).json({ message: 'File uploaded', fileUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};

export const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const fileUrls = await Promise.all(
      req.files.map(file => uploadFileService(file))
    );

    return res.status(201).json({
      message: `${req.files.length} file(s) uploaded successfully`,
      count: req.files.length,
      urls: fileUrls
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};

export const serveIt = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'file', filename);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    return res.status(404).json({ message: 'File not found' });
  }
};