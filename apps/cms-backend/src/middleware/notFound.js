const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    method: req.method,
    path: req.path
  });
};

module.exports = notFound;