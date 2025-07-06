const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, validateQuery, seoMetaSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public route - get SEO meta for any page
router.get('/page', 
  validateQuery(seoMetaSchemas.getPageSEO),
  asyncHandler(seoController.getPageSEO)
);

// Protected routes - require authentication
router.get('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validateQuery(seoMetaSchemas.query),
  asyncHandler(seoController.getAllSEOMeta)
);

router.get('/stats/page-types', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(seoController.getPageTypesStats)
);

router.post('/generate-structured-data', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(seoMetaSchemas.generateStructuredData),
  asyncHandler(seoController.generateStructuredData)
);

router.get('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(seoController.getSEOMeta)
);

router.post('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(seoMetaSchemas.create),
  asyncHandler(seoController.createSEOMeta)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(seoMetaSchemas.update),
  asyncHandler(seoController.updateSEOMeta)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(seoController.deleteSEOMeta)
);

module.exports = router;