import { Router } from 'express';
import { serveIt, uploadMultipleFiles } from '../controllers/file.controller.js';
import { upload } from '../middleware/file.middleware.js';

const router = Router();

router.post('/upload', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const urls = req.files.map(file => `/file/${file.filename}`);

  res.status(201).json({
    message: `${req.files.length} file(s) uploaded successfully`,
    count: req.files.length,
    urls
  });
});

router.get('/:filename', serveIt)

export default router;