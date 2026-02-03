import { Router } from 'express';
import { serveIt, uploadMultipleFiles } from '../controllers/file.controller.js';
import { upload } from '../middleware/file.middleware.js';

const router = Router();

router.post('/upload', upload.array('files', 10), uploadMultipleFiles); // gunakan controller

router.get('/:filename', serveIt);

export default router;