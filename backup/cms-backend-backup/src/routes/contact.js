const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, validateQuery, contactFormSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public route - anyone can submit a contact form
router.post('/submit', 
  validate(contactFormSchemas.submit),
  asyncHandler(contactController.submitContactForm)
);

// Protected routes - require authentication
router.get('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validateQuery(contactFormSchemas.query),
  asyncHandler(contactController.getAllContactForms)
);

router.get('/stats', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validateQuery(contactFormSchemas.stats),
  asyncHandler(contactController.getContactStats)
);

router.get('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(contactController.getContactForm)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(contactFormSchemas.update),
  asyncHandler(contactController.updateContactForm)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(contactController.deleteContactForm)
);

// Bulk operations
router.put('/bulk/assign', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(contactFormSchemas.bulkAssign),
  asyncHandler(contactController.bulkAssign)
);

module.exports = router;