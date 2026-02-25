import { Router } from 'express';
import { serveIt, uploadFile, uploadMultipleFiles } from '../controllers/file.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  uploadMultipleFilesSchema,
} from '../validations/file.validation.js';
import { uploadImage, uploadFiles } from '../middleware/file.middleware.js';

const router = Router();

// GET - NO VALIDATION
router.get('/:filename', serveIt);

// POST - WITH VALIDATION
router.post(
  '/upload',
  uploadImage.array('files', 10),
  validate(uploadMultipleFilesSchema),
  uploadMultipleFiles
);

router.post(
  '/upload-task',
  uploadFiles.array('files', 10),
  validate(uploadMultipleFilesSchema),
  uploadMultipleFiles
)

export default router;