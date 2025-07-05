const express = require('express');
const router = express.Router();
const caseStudyController = require('../controllers/caseStudyController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, validateQuery, caseStudySchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes (or authenticated based on your needs)
router.get('/', 
  validateQuery(caseStudySchemas.query),
  asyncHandler(caseStudyController.getAllCaseStudies)
);

router.get('/:id', 
  asyncHandler(caseStudyController.getCaseStudy)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(caseStudySchemas.create),
  asyncHandler(caseStudyController.createCaseStudy)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(caseStudySchemas.update),
  asyncHandler(caseStudyController.updateCaseStudy)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(caseStudyController.deleteCaseStudy)
);

// Publishing endpoints
router.post('/:id/publish', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(caseStudyController.publishCaseStudy)
);

router.post('/:id/unpublish', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(caseStudyController.unpublishCaseStudy)
);

module.exports = router;