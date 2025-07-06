const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, categorySchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/', 
  asyncHandler(categoryController.getAllCategories)
);

router.get('/:id', 
  asyncHandler(categoryController.getCategory)
);

router.get('/:id/stats', 
  asyncHandler(categoryController.getCategoryStats)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(categorySchemas.create),
  asyncHandler(categoryController.createCategory)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(categorySchemas.update),
  asyncHandler(categoryController.updateCategory)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(categoryController.deleteCategory)
);

module.exports = router;