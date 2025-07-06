const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, industrySchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/', 
  asyncHandler(industryController.getAllIndustries)
);

router.get('/:id', 
  asyncHandler(industryController.getIndustry)
);

router.get('/:id/stats', 
  asyncHandler(industryController.getIndustryStats)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(industrySchemas.create),
  asyncHandler(industryController.createIndustry)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(industrySchemas.update),
  asyncHandler(industryController.updateIndustry)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(industryController.deleteIndustry)
);

module.exports = router;