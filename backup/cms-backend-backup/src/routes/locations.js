const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locationsController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validate, validateQuery, locationSchemas } = require('../utils/validation');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.get('/', 
  validateQuery(locationSchemas.query),
  asyncHandler(locationsController.getAllLocations)
);

router.get('/headquarters', 
  asyncHandler(locationsController.getHeadquarters)
);

router.get('/countries', 
  asyncHandler(locationsController.getCountries)
);

router.get('/regions', 
  asyncHandler(locationsController.getLocationsByRegion)
);

router.get('/stats', 
  asyncHandler(locationsController.getLocationStats)
);

router.get('/country/:country', 
  asyncHandler(locationsController.getLocationsByCountry)
);

router.get('/:id', 
  asyncHandler(locationsController.getLocation)
);

// Protected routes - require authentication
router.post('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(locationSchemas.create),
  asyncHandler(locationsController.createLocation)
);

router.put('/:id', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  validate(locationSchemas.update),
  asyncHandler(locationsController.updateLocation)
);

router.delete('/:id', 
  authenticateToken,
  requireRole('ADMIN'),
  asyncHandler(locationsController.deleteLocation)
);

module.exports = router;