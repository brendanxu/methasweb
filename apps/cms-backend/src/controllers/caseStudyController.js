const prisma = require('../utils/database');
const { 
  generateUniqueSlug, 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all case studies with pagination and filters
 */
const getAllCaseStudies = async (req, res, next) => {
  try {
    const { page, limit, skip } = extractPaginationParams(req.query);
    const { status, industry, service, search, sort, order } = req.query;

    // Build where clause
    let where = {};

    // Status filter
    if (status) {
      where.status = status;
    }

    // Industry filter
    if (industry) {
      where.industry = {
        slug: industry
      };
    }

    // Service filter
    if (service) {
      where.services = {
        some: {
          service: {
            slug: service
          }
        }
      };
    }

    // Search filter
    if (search) {
      where = {
        ...where,
        ...buildSearchWhere(search, ['title', 'clientName', 'summary'])
      };
    }

    // Count total items
    const total = await prisma.caseStudy.count({ where });

    // Get case studies
    const caseStudies = await prisma.caseStudy.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        industry: true,
        services: {
          include: {
            service: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Transform the response
    const transformedCaseStudies = caseStudies.map(cs => ({
      ...cs,
      services: cs.services.map(s => s.service)
    }));

    res.json({
      success: true,
      data: transformedCaseStudies,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single case study by ID or slug
 */
const getCaseStudy = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid CUID or slug
    const where = id.includes('-') && !id.startsWith('c') 
      ? { slug: id }
      : { id };

    const caseStudy = await prisma.caseStudy.findUnique({
      where,
      include: {
        industry: true,
        services: {
          include: {
            service: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        mediaFiles: true
      }
    });

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }

    // Transform the response
    const transformed = {
      ...caseStudy,
      services: caseStudy.services.map(s => s.service)
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
 * Create new case study
 */
const createCaseStudy = async (req, res, next) => {
  try {
    const {
      title,
      clientName,
      heroImageUrl,
      summary,
      theGoal,
      theChallenge,
      theSolution,
      industryId,
      serviceIds = [],
      status,
      metaTitle,
      metaDescription
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(title, prisma.caseStudy);

    // Create case study
    const caseStudy = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        clientName,
        heroImageUrl,
        summary,
        theGoal,
        theChallenge,
        theSolution,
        industryId,
        authorId: req.user.id,
        status: status || 'DRAFT',
        metaTitle,
        metaDescription,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        // Create service relationships
        services: {
          create: serviceIds.map(serviceId => ({
            serviceId
          }))
        }
      },
      include: {
        industry: true,
        services: {
          include: {
            service: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Transform the response
    const transformed = {
      ...caseStudy,
      services: caseStudy.services.map(s => s.service)
    };

    res.status(201).json({
      success: true,
      data: transformed
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update case study
 */
const updateCaseStudy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      clientName,
      heroImageUrl,
      summary,
      theGoal,
      theChallenge,
      theSolution,
      industryId,
      serviceIds,
      status,
      metaTitle,
      metaDescription
    } = req.body;

    // Check if case study exists
    const existing = await prisma.caseStudy.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }

    // Generate new slug if title changed
    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = await generateUniqueSlug(title, prisma.caseStudy, id);
    }

    // Handle service updates if provided
    if (serviceIds !== undefined) {
      // Delete existing service relationships
      await prisma.caseStudyService.deleteMany({
        where: { caseStudyId: id }
      });
    }

    // Update case study
    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...(title && { title, slug }),
        ...(clientName && { clientName }),
        ...(heroImageUrl !== undefined && { heroImageUrl }),
        ...(summary && { summary }),
        ...(theGoal && { theGoal }),
        ...(theChallenge && { theChallenge }),
        ...(theSolution && { theSolution }),
        ...(industryId !== undefined && { industryId }),
        ...(status && { 
          status,
          publishedAt: status === 'PUBLISHED' && !existing.publishedAt 
            ? new Date() 
            : existing.publishedAt
        }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        // Create new service relationships if provided
        ...(serviceIds !== undefined && {
          services: {
            create: serviceIds.map(serviceId => ({
              serviceId
            }))
          }
        })
      },
      include: {
        industry: true,
        services: {
          include: {
            service: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Transform the response
    const transformed = {
      ...caseStudy,
      services: caseStudy.services.map(s => s.service)
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
 * Delete case study
 */
const deleteCaseStudy = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if case study exists
    const existing = await prisma.caseStudy.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }

    // Delete case study (cascade will handle related records)
    await prisma.caseStudy.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Case study deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Publish case study
 */
const publishCaseStudy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: caseStudy,
      message: 'Case study published successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unpublish case study
 */
const unpublishCaseStudy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        status: 'DRAFT'
      }
    });

    res.json({
      success: true,
      data: caseStudy,
      message: 'Case study unpublished successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  publishCaseStudy,
  unpublishCaseStudy
};