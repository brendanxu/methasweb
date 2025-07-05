const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, validateQuery, teamMemberSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/', 
  validateQuery(teamMemberSchemas.query),
  asyncHandler(teamController.getAllTeamMembers)
);

router.get('/leadership', 
  asyncHandler(teamController.getLeadershipTeam)
);

router.get('/departments', 
  asyncHandler(teamController.getDepartments)
);

router.get('/department/:department', 
  asyncHandler(teamController.getTeamByDepartment)
);

router.get('/:id', 
  asyncHandler(teamController.getTeamMember)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(teamMemberSchemas.create),
  asyncHandler(teamController.createTeamMember)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(teamMemberSchemas.update),
  asyncHandler(teamController.updateTeamMember)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(teamController.deleteTeamMember)
);

// Batch update display order
router.put('/batch/display-order', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(teamMemberSchemas.updateDisplayOrder),
  asyncHandler(teamController.updateDisplayOrder)
);

module.exports = router;