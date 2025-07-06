const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, validateQuery, newsSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/', 
  validateQuery(newsSchemas.query),
  asyncHandler(newsController.getAllNewsArticles)
);

router.get('/:id', 
  asyncHandler(newsController.getNewsArticle)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(newsSchemas.create),
  asyncHandler(newsController.createNewsArticle)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(newsSchemas.update),
  asyncHandler(newsController.updateNewsArticle)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(newsController.deleteNewsArticle)
);

// Publishing endpoints
router.post('/:id/publish', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(newsController.publishNewsArticle)
);

router.post('/:id/unpublish', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(newsController.unpublishNewsArticle)
);

module.exports = router;