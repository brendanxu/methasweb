const prisma = require('../utils/database');
const { 
  generateUniqueSlug, 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all services with pagination and filters
 */
const getAllServices = async (req, res, next) => {
  try {
    const { page, limit, skip } = extractPaginationParams(req.query);
    const { search, sort, order, isActive } = req.query;

    // Build where clause
    let where = {};

    // Active filter
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    // Search filter
    if (search) {
      where = {
        ...where,
        ...buildSearchWhere(search, ['name', 'description'])
      };
    }

    // Count total items
    const total = await prisma.service.count({ where });

    // Get services
    const services = await prisma.service.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        _count: {
          select: {
            caseStudyServices: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: services,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single service by ID or slug
 */
const getService = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid CUID or slug
    const where = id.includes('-') && !id.startsWith('c') 
      ? { slug: id }
      : { id };

    const service = await prisma.service.findUnique({
      where,
      include: {
        caseStudies: {
          include: {
            caseStudy: {
              select: {
                id: true,
                title: true,
                slug: true,
                clientName: true,
                heroImageUrl: true,
                summary: true,
                status: true,
                publishedAt: true
              }
            }
          }
        },
        _count: {
          select: {
            caseStudyServices: true
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    // Transform the response
    const transformed = {
      ...service,
      caseStudies: service.caseStudies.map(cs => cs.caseStudy)
    };

    res.json({
      success: true,
      data: transformed
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new service
 */
const createService = async (req, res, next) => {
  try {
    const {
      name,
      description,
      iconUrl,
      color
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(name, prisma.service);

    // Create service
    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        iconUrl,
        color
      }
    });

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update service
 */
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      iconUrl,
      color,
      isActive
    } = req.body;

    // Check if service exists
    const existing = await prisma.service.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    // Generate new slug if name changed
    let slug = existing.slug;
    if (name && name !== existing.name) {
      slug = await generateUniqueSlug(name, prisma.service, id);
    }

    // Update service
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(iconUrl !== undefined && { iconUrl }),
        ...(color !== undefined && { color }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete service
 */
const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if service exists
    const existing = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            caseStudyServices: true
          }
        }
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    // Check if service has case studies
    if (existing._count.caseStudyServices > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete service with associated case studies'
      });
    }

    // Delete service
    await prisma.service.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get service statistics
 */
const getServiceStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            caseStudyServices: true
          }
        },
        caseStudies: {
          where: {
            caseStudy: {
              status: 'PUBLISHED'
            }
          },
          select: {
            caseStudy: {
              select: {
                publishedAt: true
              }
            }
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    const stats = {
      totalCaseStudies: service._count.caseStudies,
      publishedCaseStudies: service.caseStudies.length,
      latestCaseStudy: service.caseStudies.length > 0 
        ? service.caseStudies[0].caseStudy.publishedAt 
        : null
    };

    res.json({
      success: true,
      data: {
        service: {
          id: service.id,
          name: service.name,
          slug: service.slug
        },
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
  getServiceStats
};