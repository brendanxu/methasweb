const prisma = require('../utils/database');
const { 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all office locations with filtering and pagination
 */
const getAllLocations = async (req, res, next) => {
  try {
    const { page, limit, sort, order } = extractPaginationParams(req.query);
    const { 
      isActive, 
      isHeadquarters, 
      country, 
      search 
    } = req.query;

    // Build where clause
    let where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (isHeadquarters !== undefined) {
      where.isHeadquarters = isHeadquarters === 'true';
    }

    if (country) {
      where.country = {
        contains: country,
        mode: 'insensitive'
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build order by
    let orderBy = [];
    if (sort === 'name') {
      orderBy.push({ name: order });
    } else if (sort === 'city') {
      orderBy.push({ city: order });
    } else if (sort === 'country') {
      orderBy.push({ country: order });
    } else {
      // Default sorting: headquarters first, then by country, then by city
      orderBy = [
        { isHeadquarters: 'desc' },
        { country: 'asc' },
        { city: 'asc' }
      ];
    }

    // Get total count
    const total = await prisma.officeLocation.count({ where });

    // Get locations
    const locations = await prisma.officeLocation.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    });

    const pagination = buildPaginationMeta(page, limit, total);

    res.json({
      success: true,
      data: locations,
      pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get headquarters location
 */
const getHeadquarters = async (req, res, next) => {
  try {
    const headquarters = await prisma.officeLocation.findFirst({
      where: {
        isHeadquarters: true,
        isActive: true
      }
    });

    if (!headquarters) {
      return res.status(404).json({
        success: false,
        error: 'Headquarters location not found'
      });
    }

    res.json({
      success: true,
      data: headquarters
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get locations by country
 */
const getLocationsByCountry = async (req, res, next) => {
  try {
    const { country } = req.params;
    const { isActive = 'true' } = req.query;

    const locations = await prisma.officeLocation.findMany({
      where: {
        country: {
          contains: country,
          mode: 'insensitive'
        },
        isActive: isActive === 'true'
      },
      orderBy: [
        { isHeadquarters: 'desc' },
        { city: 'asc' }
      ]
    });

    res.json({
      success: true,
      data: locations
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single office location
 */
const getLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const location = await prisma.officeLocation.findUnique({
      where: { id }
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        error: 'Office location not found'
      });
    }

    res.json({
      success: true,
      data: location
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create office location
 */
const createLocation = async (req, res, next) => {
  try {
    const {
      name,
      address,
      city,
      country,
      countryCode,
      phone,
      email,
      timezone,
      coordinates,
      description,
      imageUrl,
      isHeadquarters
    } = req.body;

    // If this is set as headquarters, unset any existing headquarters
    if (isHeadquarters) {
      await prisma.officeLocation.updateMany({
        where: { isHeadquarters: true },
        data: { isHeadquarters: false }
      });
    }

    const location = await prisma.officeLocation.create({
      data: {
        name,
        address,
        city,
        country,
        countryCode,
        phone,
        email,
        timezone,
        coordinates,
        description,
        imageUrl,
        isHeadquarters: isHeadquarters || false
      }
    });

    res.status(201).json({
      success: true,
      data: location
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update office location
 */
const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      city,
      country,
      countryCode,
      phone,
      email,
      timezone,
      coordinates,
      description,
      imageUrl,
      isHeadquarters,
      isActive
    } = req.body;

    // Check if exists
    const existing = await prisma.officeLocation.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Office location not found'
      });
    }

    // If this is set as headquarters, unset any existing headquarters
    if (isHeadquarters && !existing.isHeadquarters) {
      await prisma.officeLocation.updateMany({
        where: { 
          isHeadquarters: true,
          id: { not: id }
        },
        data: { isHeadquarters: false }
      });
    }

    const location = await prisma.officeLocation.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(country !== undefined && { country }),
        ...(countryCode !== undefined && { countryCode }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(timezone !== undefined && { timezone }),
        ...(coordinates !== undefined && { coordinates }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isHeadquarters !== undefined && { isHeadquarters }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: location
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete office location
 */
const deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.officeLocation.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Office location not found'
      });
    }

    // Prevent deletion of headquarters unless there's another one
    if (existing.isHeadquarters) {
      const otherHeadquarters = await prisma.officeLocation.count({
        where: {
          isHeadquarters: true,
          id: { not: id }
        }
      });

      if (otherHeadquarters === 0) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete the only headquarters location. Please designate another location as headquarters first.'
        });
      }
    }

    await prisma.officeLocation.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Office location deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get countries list with office counts
 */
const getCountries = async (req, res, next) => {
  try {
    const countries = await prisma.officeLocation.findMany({
      where: { isActive: true },
      select: {
        country: true,
        countryCode: true
      },
      distinct: ['country']
    });

    // Get office counts per country
    const countriesWithCounts = await Promise.all(
      countries.map(async (countryData) => {
        const totalOffices = await prisma.officeLocation.count({
          where: {
            country: countryData.country,
            isActive: true
          }
        });

        const hasHeadquarters = await prisma.officeLocation.count({
          where: {
            country: countryData.country,
            isActive: true,
            isHeadquarters: true
          }
        }) > 0;

        return {
          country: countryData.country,
          countryCode: countryData.countryCode,
          totalOffices,
          hasHeadquarters
        };
      })
    );

    res.json({
      success: true,
      data: countriesWithCounts.sort((a, b) => a.country.localeCompare(b.country))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get locations grouped by region/continent
 */
const getLocationsByRegion = async (req, res, next) => {
  try {
    const locations = await prisma.officeLocation.findMany({
      where: { isActive: true },
      orderBy: [
        { isHeadquarters: 'desc' },
        { country: 'asc' },
        { city: 'asc' }
      ]
    });

    // Group by region (simple mapping, could be enhanced)
    const regionMapping = {
      'Switzerland': 'Europe',
      'United Kingdom': 'Europe',
      'Germany': 'Europe',
      'Netherlands': 'Europe',
      'United States': 'North America',
      'Canada': 'North America',
      'Singapore': 'Asia Pacific',
      'Australia': 'Asia Pacific',
      'Japan': 'Asia Pacific',
      'Brazil': 'Latin America',
      'Mexico': 'Latin America',
      'Kenya': 'Africa',
      'South Africa': 'Africa'
    };

    const grouped = locations.reduce((acc, location) => {
      const region = regionMapping[location.country] || 'Other';
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(location);
      return acc;
    }, {});

    res.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get office location statistics
 */
const getLocationStats = async (req, res, next) => {
  try {
    const stats = {
      totalLocations: await prisma.officeLocation.count({ where: { isActive: true } }),
      totalCountries: await prisma.officeLocation.findMany({
        where: { isActive: true },
        select: { country: true },
        distinct: ['country']
      }).then(countries => countries.length),
      headquarters: await prisma.officeLocation.count({
        where: { isActive: true, isHeadquarters: true }
      }),
      locationsWithContact: await prisma.officeLocation.count({
        where: { 
          isActive: true,
          OR: [
            { phone: { not: null } },
            { email: { not: null } }
          ]
        }
      })
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLocations,
  getHeadquarters,
  getLocationsByCountry,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  getCountries,
  getLocationsByRegion,
  getLocationStats
};