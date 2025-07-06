const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, serviceSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/', 
  asyncHandler(serviceController.getAllServices)
);

router.get('/:id', 
  asyncHandler(serviceController.getService)
);

router.get('/:id/stats', 
  asyncHandler(serviceController.getServiceStats)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(serviceSchemas.create),
  asyncHandler(serviceController.createService)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(serviceSchemas.update),
  asyncHandler(serviceController.updateService)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(serviceController.deleteService)
);

module.exports = router;