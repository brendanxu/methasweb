const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, companySchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/about', 
  asyncHandler(companyController.getAboutPageData)
);

router.get('/info', 
  asyncHandler(companyController.getAllCompanyInfo)
);

router.get('/info/section/:section', 
  asyncHandler(companyController.getCompanyInfoBySection)
);

router.get('/stats', 
  asyncHandler(companyController.getAllCompanyStats)
);

// Protected routes - Company Info
router.get('/info/:id', 
  authenticateToken,
  asyncHandler(companyController.getCompanyInfo)
);

router.post('/info', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(companySchemas.createInfo),
  asyncHandler(companyController.createCompanyInfo)
);

router.put('/info/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(companySchemas.updateInfo),
  asyncHandler(companyController.updateCompanyInfo)
);

router.delete('/info/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(companyController.deleteCompanyInfo)
);

// Protected routes - Company Stats
router.post('/stats', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(companySchemas.createStats),
  asyncHandler(companyController.createCompanyStats)
);

router.put('/stats/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(companySchemas.updateStats),
  asyncHandler(companyController.updateCompanyStats)
);

router.delete('/stats/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(companyController.deleteCompanyStats)
);

module.exports = router;