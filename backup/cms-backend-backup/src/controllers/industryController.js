const prisma = require('../utils/database');
const { 
  generateUniqueSlug, 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all industries with pagination and filters
 */
const getAllIndustries = async (req, res, next) => {
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
    const total = await prisma.industry.count({ where });

    // Get industries
    const industries = await prisma.industry.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        _count: {
          select: {
            caseStudies: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: industries,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single industry by ID or slug
 */
const getIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid CUID or slug
    const where = id.includes('-') && !id.startsWith('c') 
      ? { slug: id }
      : { id };

    const industry = await prisma.industry.findUnique({
      where,
      include: {
        caseStudies: {
          where: {
            status: 'PUBLISHED'
          },
          select: {
            id: true,
            title: true,
            slug: true,
            clientName: true,
            heroImageUrl: true,
            summary: true,
            publishedAt: true,
            services: {
              include: {
                service: {
                  select: {
                    id: true,
                    name: true,
                    slug: true
                  }
                }
              }
            }
          },
          orderBy: {
            publishedAt: 'desc'
          },
          take: 10
        },
        _count: {
          select: {
            caseStudies: true
          }
        }
      }
    });

    if (!industry) {
      return res.status(404).json({
        success: false,
        error: 'Industry not found'
      });
    }

    // Transform the response
    const transformed = {
      ...industry,
      caseStudies: industry.caseStudies.map(cs => ({
        ...cs,
        services: cs.services.map(s => s.service)
      }))
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
 * Create new industry
 */
const createIndustry = async (req, res, next) => {
  try {
    const {
      name,
      description
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(name, prisma.industry);

    // Create industry
    const industry = await prisma.industry.create({
      data: {
        name,
        slug,
        description
      }
    });

    res.status(201).json({
      success: true,
      data: industry
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update industry
 */
const updateIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      isActive
    } = req.body;

    // Check if industry exists
    const existing = await prisma.industry.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Industry not found'
      });
    }

    // Generate new slug if name changed
    let slug = existing.slug;
    if (name && name !== existing.name) {
      slug = await generateUniqueSlug(name, prisma.industry, id);
    }

    // Update industry
    const industry = await prisma.industry.update({
      where: { id },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: industry
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete industry
 */
const deleteIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if industry exists
    const existing = await prisma.industry.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            caseStudies: true
          }
        }
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Industry not found'
      });
    }

    // Check if industry has case studies
    if (existing._count.caseStudies > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete industry with associated case studies'
      });
    }

    // Delete industry
    await prisma.industry.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Industry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get industry statistics
 */
const getIndustryStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const industry = await prisma.industry.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            caseStudies: true
          }
        },
        caseStudies: {
          where: {
            status: 'PUBLISHED'
          },
          select: {
            publishedAt: true
          },
          orderBy: {
            publishedAt: 'desc'
          },
          take: 1
        }
      }
    });

    if (!industry) {
      return res.status(404).json({
        success: false,
        error: 'Industry not found'
      });
    }

    const publishedCount = await prisma.caseStudy.count({
      where: {
        industryId: id,
        status: 'PUBLISHED'
      }
    });

    const stats = {
      totalCaseStudies: industry._count.caseStudies,
      publishedCaseStudies: publishedCount,
      latestCaseStudy: industry.caseStudies.length > 0 
        ? industry.caseStudies[0].publishedAt 
        : null
    };

    res.json({
      success: true,
      data: {
        industry: {
          id: industry.id,
          name: industry.name,
          slug: industry.slug
        },
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllIndustries,
  getIndustry,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getIndustryStats
};