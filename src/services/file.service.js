import path from 'path';
import fs from 'fs';

export const uploadFileService = async (file, nama) => {
  const ext = path.extname(file.originalname);
  const newFileName = nama + ext;

  const oldPath = path.join(process.cwd(), 'file', file.filename);
  const newPath = path.join(process.cwd(), 'file', newFileName);

  fs.renameSync(oldPath, newPath);

  return `/file/${newFileName}`;
};