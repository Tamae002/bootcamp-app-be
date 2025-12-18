export const uploadFileService = async (file) => {
  return `/file/${file.filename}`;
};