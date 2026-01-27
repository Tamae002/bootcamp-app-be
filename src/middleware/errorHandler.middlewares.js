// import { NODE_ENV } from "../config/prisma.js";

const NODE_ENV = 'development'
// Tambahkan custom error handling untuk Prisma
const prismaErrorHandler = (err) => {
  if (err?.code) {
    switch (err.code) {
      case 'P2002': // Unique constraint failed
        return { 
          statusCode: 400, 
          message: `Data sudah terdaftar: ${err.meta?.target?.[0] || 'field'}` 
        };
      case 'P2003': // Foreign key constraint failed
        return { 
          statusCode: 400, 
          message: 'Data terkait tidak ditemukan' 
        };
      case 'P2025': // Record not found
        return { 
          statusCode: 404, 
          message: 'Data tidak ditemukan' 
        };
      default:
        return { 
          statusCode: 500, 
          message: 'Database error', 
          cause: err.message 
        };
    }
  }
  return null;
};

const errorHandler = (err, req, res, next) => {
  // Handle Prisma errors first
  const prismaError = prismaErrorHandler(err);
  if (prismaError) {
    err.statusCode = prismaError.statusCode;
    err.message = prismaError.message;
    err.cause = prismaError.cause || err.message;
  }

  // Default error values
  const statusCode = err.statusCode || 500;
  const message = err.message ?? 'Internal Server Error';
  
  // Format response
  return res.status(statusCode).json({
    success: false,
    status_code: statusCode,
    message,
    detail: err.cause || '',
    stack: NODE_ENV === "development" ? err.stack : ""
  });
};

export default errorHandler;