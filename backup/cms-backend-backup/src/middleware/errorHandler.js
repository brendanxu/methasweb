const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  };

  // Prisma errors
  if (err.code === 'P2002') {
    error.status = 400;
    error.message = 'Unique constraint violation. This record already exists.';
  }

  if (err.code === 'P2025') {
    error.status = 404;
    error.message = 'Record not found.';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.status = 401;
    error.message = 'Invalid token.';
  }

  if (err.name === 'TokenExpiredError') {
    error.status = 401;
    error.message = 'Token expired.';
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = err.details ? err.details[0].message : 'Validation error';
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.status = 400;
    error.message = 'File too large';
  }

  // CORS errors
  if (err.message.includes('CORS')) {
    error.status = 403;
    error.message = 'CORS policy violation';
  }

  res.status(error.status).json({
    success: false,
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;