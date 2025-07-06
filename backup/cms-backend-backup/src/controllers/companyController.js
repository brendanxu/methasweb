const prisma = require('../utils/database');
const { 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all company information sections
 */
const getAllCompanyInfo = async (req, res, next) => {
  try {
    const { section, isActive } = req.query;

    // Build where clause
    let where = {};

    if (section) {
      where.section = section.toUpperCase();
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const companyInfo = await prisma.companyInfo.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get company information by section
 */
const getCompanyInfoBySection = async (req, res, next) => {
  try {
    const { section } = req.params;

    const companyInfo = await prisma.companyInfo.findMany({
      where: {
        section: section.toUpperCase(),
        isActive: true
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single company info item
 */
const getCompanyInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const companyInfo = await prisma.companyInfo.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!companyInfo) {
      return res.status(404).json({
        success: false,
        error: 'Company information not found'
      });
    }

    res.json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create company information
 */
const createCompanyInfo = async (req, res, next) => {
  try {
    const {
      section,
      title,
      subtitle,
      content,
      imageUrl,
      videoUrl,
      ctaText,
      ctaUrl,
      displayOrder
    } = req.body;

    const companyInfo = await prisma.companyInfo.create({
      data: {
        section: section.toUpperCase(),
        title,
        subtitle,
        content,
        imageUrl,
        videoUrl,
        ctaText,
        ctaUrl,
        displayOrder,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update company information
 */
const updateCompanyInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      section,
      title,
      subtitle,
      content,
      imageUrl,
      videoUrl,
      ctaText,
      ctaUrl,
      displayOrder,
      isActive
    } = req.body;

    // Check if exists
    const existing = await prisma.companyInfo.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Company information not found'
      });
    }

    const companyInfo = await prisma.companyInfo.update({
      where: { id },
      data: {
        ...(section && { section: section.toUpperCase() }),
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(ctaText !== undefined && { ctaText }),
        ...(ctaUrl !== undefined && { ctaUrl }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete company information
 */
const deleteCompanyInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.companyInfo.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Company information not found'
      });
    }

    await prisma.companyInfo.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Company information deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get company statistics
 */
const getAllCompanyStats = async (req, res, next) => {
  try {
    const { isActive } = req.query;

    let where = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const stats = await prisma.companyStats.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create company statistic
 */
const createCompanyStats = async (req, res, next) => {
  try {
    const {
      label,
      value,
      description,
      iconUrl,
      displayOrder
    } = req.body;

    const stat = await prisma.companyStats.create({
      data: {
        label,
        value,
        description,
        iconUrl,
        displayOrder
      }
    });

    res.status(201).json({
      success: true,
      data: stat
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update company statistic
 */
const updateCompanyStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      label,
      value,
      description,
      iconUrl,
      displayOrder,
      isActive
    } = req.body;

    const existing = await prisma.companyStats.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Company statistic not found'
      });
    }

    const stat = await prisma.companyStats.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(description !== undefined && { description }),
        ...(iconUrl !== undefined && { iconUrl }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: stat
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete company statistic
 */
const deleteCompanyStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.companyStats.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Company statistic not found'
      });
    }

    await prisma.companyStats.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Company statistic deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get complete about page data
 */
const getAboutPageData = async (req, res, next) => {
  try {
    // Get all active company info sections
    const companyInfo = await prisma.companyInfo.findMany({
      where: { isActive: true },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Get company stats
    const stats = await prisma.companyStats.findMany({
      where: { isActive: true },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    // Get leadership team (top 6 for about page)
    const leadership = await prisma.teamMember.findMany({
      where: {
        isLeadership: true,
        isActive: true
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      take: 6
    });

    // Get office locations
    const locations = await prisma.officeLocation.findMany({
      where: { isActive: true },
      orderBy: [
        { isHeadquarters: 'desc' },
        { country: 'asc' },
        { city: 'asc' }
      ]
    });

    // Group company info by section
    const groupedInfo = companyInfo.reduce((acc, info) => {
      if (!acc[info.section]) {
        acc[info.section] = [];
      }
      acc[info.section].push(info);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        sections: groupedInfo,
        stats,
        leadership,
        locations,
        meta: {
          lastUpdated: new Date(),
          totalSections: Object.keys(groupedInfo).length,
          totalStats: stats.length,
          totalLeadership: leadership.length,
          totalLocations: locations.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Company Info
  getAllCompanyInfo,
  getCompanyInfoBySection,
  getCompanyInfo,
  createCompanyInfo,
  updateCompanyInfo,
  deleteCompanyInfo,
  
  // Company Stats
  getAllCompanyStats,
  createCompanyStats,
  updateCompanyStats,
  deleteCompanyStats,
  
  // Combined Data
  getAboutPageData
};