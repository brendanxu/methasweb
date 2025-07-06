const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { asyncHandler } = require('../utils/helpers');

// Public routes (for serving files)
router.get('/', 
  authenticateToken,
  asyncHandler(mediaController.getAllMedia)
);

router.get('/stats', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(mediaController.getMediaStats)
);

router.get('/:id', 
  authenticateToken,
  asyncHandler(mediaController.getMediaFile)
);

// Upload routes - require authentication
router.post('/upload', 
  authenticateToken,
  mediaController.upload.single('file'),
  asyncHandler(mediaController.uploadFile)
);

router.post('/upload-multiple', 
  authenticateToken,
  mediaController.upload.array('files', 10), // Max 10 files
  asyncHandler(mediaController.uploadMultipleFiles)
);

// Update routes
router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(mediaController.updateMediaFile)
);

// Delete routes
router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(mediaController.deleteMediaFile)
);

module.exports = router;