const express = require('express');
const router = express.Router();
const Joi = require('joi');
const userController = require('../controllers/userController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, userSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Admin only routes
router.get('/', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(userController.getAllUsers)
);

router.get('/stats', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(userController.getUserStats)
);

router.get('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(userController.getUser)
);

router.post('/', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(userSchemas.create),
  asyncHandler(userController.createUser)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(userSchemas.update),
  asyncHandler(userController.updateUser)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(userController.deleteUser)
);

router.post('/:id/reset-password', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(Joi.object({
    newPassword: Joi.string().min(6).required()
  })),
  asyncHandler(userController.resetUserPassword)
);

router.post('/bulk-update', 
  authenticateToken,
  requireRole('ADMIN'),
  validate(Joi.object({
    userIds: Joi.array().items(Joi.string()).min(1).required(),
    action: Joi.string().valid('activate', 'deactivate', 'changeRole').required(),
    data: Joi.object({
      role: Joi.string().valid('ADMIN', 'EDITOR', 'VIEWER')
    })
  })),
  asyncHandler(userController.bulkUpdateUsers)
);

module.exports = router;