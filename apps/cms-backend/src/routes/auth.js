const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, authSchemas, userSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.post('/login', 
  validate(authSchemas.login), 
  asyncHandler(authController.login)
);

router.post('/logout', 
  asyncHandler(authController.logout)
);

// Protected routes
router.get('/me', 
  authenticateToken, 
  asyncHandler(authController.getMe)
);

// Alias for profile
router.get('/profile', 
  authenticateToken, 
  asyncHandler(authController.getMe)
);

router.put('/profile', 
  authenticateToken, 
  validate(userSchemas.updateProfile), 
  asyncHandler(authController.updateProfile)
);

router.post('/change-password', 
  authenticateToken, 
  validate(userSchemas.changePassword), 
  asyncHandler(authController.changePassword)
);

router.post('/refresh', 
  authenticateToken, 
  asyncHandler(authController.refreshToken)
);

// Admin only - create new users
router.post('/register', 
  authenticateToken, 
  requireRole('ADMIN'), 
  validate(authSchemas.register), 
  asyncHandler(authController.register)
);

module.exports = router;