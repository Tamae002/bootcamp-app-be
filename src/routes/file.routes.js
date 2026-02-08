import { Router } from 'express';
import { serveIt, uploadMultipleFiles } from '../controllers/file.controller.js';
import { upload } from '../middleware/file.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  uploadMultipleFilesSchema,
} from '../validations/file.validation.js';

const router = Router();

// GET - NO VALIDATION
router.get('/:filename', serveIt);

// POST - WITH VALIDATION
router.post(
  '/upload',
  upload.array('files', 10),
  validate(uploadMultipleFilesSchema),
  uploadMultipleFiles
);

export default router;