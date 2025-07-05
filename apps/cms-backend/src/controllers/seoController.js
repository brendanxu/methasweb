const prisma = require('../utils/database');
const { 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get SEO meta for a specific page (Public)
 */
const getPageSEO = async (req, res, next) => {
  try {
    const { pageType, pagePath, referenceId } = req.query;

    if (!pageType) {
      return res.status(400).json({
        success: false,
        error: 'pageType is required'
      });
    }

    // Build where clause to find the most specific SEO meta
    let where = {
      pageType: pageType.toUpperCase(),
      isActive: true
    };

    if (referenceId) {
      where.referenceId = referenceId;
    } else if (pagePath) {
      where.pagePath = pagePath;
    }

    // Try to find specific SEO meta first
    let seoMeta = await prisma.sEOMeta.findFirst({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // If no specific meta found, get default for page type
    if (!seoMeta) {
      seoMeta = await prisma.sEOMeta.findFirst({
        where: {
          pageType: pageType.toUpperCase(),
          isDefault: true,
          isActive: true
        }
      });
    }

    // If still no meta found, create a basic response
    if (!seoMeta) {
      return res.json({
        success: true,
        data: {
          title: 'South Pole - Climate Solutions',
          description: 'Leading provider of global sustainability solutions and services.',
          keywords: 'climate solutions, carbon markets, sustainability, renewable energy',
          robots: 'index,follow',
          viewport: 'width=device-width, initial-scale=1',
          ogType: 'website',
          ogSiteName: 'South Pole',
          ogLocale: 'en_US',
          twitterCard: 'summary_large_image'
        }
      });
    }

    res.json({
      success: true,
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all SEO meta entries with filtering and pagination (Admin)
 */
const getAllSEOMeta = async (req, res, next) => {
  try {
    const { page, limit, sort, order } = extractPaginationParams(req.query);
    const { 
      pageType, 
      isActive, 
      isDefault,
      referenceType,
      search 
    } = req.query;

    // Build where clause
    let where = {};

    if (pageType) {
      where.pageType = pageType.toUpperCase();
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (isDefault !== undefined) {
      where.isDefault = isDefault === 'true';
    }

    if (referenceType) {
      where.referenceType = referenceType;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { pagePath: { contains: search, mode: 'insensitive' } },
        { keywords: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build order by
    let orderBy = [];
    if (sort === 'title') {
      orderBy.push({ title: order });
    } else if (sort === 'pageType') {
      orderBy.push({ pageType: order });
    } else if (sort === 'priority') {
      orderBy.push({ priority: order });
    } else {
      // Default: page type, then priority, then creation date
      orderBy = [
        { pageType: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' }
      ];
    }

    // Get total count
    const total = await prisma.sEOMeta.count({ where });

    // Get SEO meta entries
    const seoMeta = await prisma.sEOMeta.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    const pagination = buildPaginationMeta(page, limit, total);

    res.json({
      success: true,
      data: seoMeta,
      pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single SEO meta entry
 */
const getSEOMeta = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seoMeta = await prisma.sEOMeta.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!seoMeta) {
      return res.status(404).json({
        success: false,
        error: 'SEO meta not found'
      });
    }

    res.json({
      success: true,
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create SEO meta entry
 */
const createSEOMeta = async (req, res, next) => {
  try {
    const {
      pageType,
      pagePath,
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      ogImageAlt,
      ogType,
      ogUrl,
      ogSiteName,
      ogLocale,
      twitterCard,
      twitterSite,
      twitterCreator,
      twitterTitle,
      twitterDescription,
      twitterImage,
      twitterImageAlt,
      canonical,
      robots,
      viewport,
      structuredData,
      customMeta,
      referenceId,
      referenceType,
      isDefault,
      priority
    } = req.body;

    // If setting as default, unset other defaults for this page type
    if (isDefault) {
      await prisma.sEOMeta.updateMany({
        where: {
          pageType: pageType.toUpperCase(),
          isDefault: true
        },
        data: { isDefault: false }
      });
    }

    const seoMeta = await prisma.sEOMeta.create({
      data: {
        pageType: pageType.toUpperCase(),
        pagePath,
        title,
        description,
        keywords,
        ogTitle: ogTitle || title,
        ogDescription: ogDescription || description,
        ogImage,
        ogImageAlt,
        ogType,
        ogUrl,
        ogSiteName,
        ogLocale,
        twitterCard,
        twitterSite,
        twitterCreator,
        twitterTitle: twitterTitle || title,
        twitterDescription: twitterDescription || description,
        twitterImage,
        twitterImageAlt,
        canonical,
        robots,
        viewport,
        structuredData,
        customMeta,
        referenceId,
        referenceType,
        isDefault: isDefault || false,
        priority: priority || 0,
        createdById: req.user.id
      },
      include: {
        createdBy: {
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
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update SEO meta entry
 */
const updateSEOMeta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      pageType,
      pagePath,
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      ogImageAlt,
      ogType,
      ogUrl,
      ogSiteName,
      ogLocale,
      twitterCard,
      twitterSite,
      twitterCreator,
      twitterTitle,
      twitterDescription,
      twitterImage,
      twitterImageAlt,
      canonical,
      robots,
      viewport,
      structuredData,
      customMeta,
      referenceId,
      referenceType,
      isActive,
      isDefault,
      priority
    } = req.body;

    // Check if exists
    const existing = await prisma.sEOMeta.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'SEO meta not found'
      });
    }

    // If setting as default, unset other defaults for this page type
    if (isDefault && !existing.isDefault) {
      const targetPageType = pageType ? pageType.toUpperCase() : existing.pageType;
      await prisma.sEOMeta.updateMany({
        where: {
          pageType: targetPageType,
          isDefault: true,
          id: { not: id }
        },
        data: { isDefault: false }
      });
    }

    const seoMeta = await prisma.sEOMeta.update({
      where: { id },
      data: {
        ...(pageType !== undefined && { pageType: pageType.toUpperCase() }),
        ...(pagePath !== undefined && { pagePath }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(keywords !== undefined && { keywords }),
        ...(ogTitle !== undefined && { ogTitle }),
        ...(ogDescription !== undefined && { ogDescription }),
        ...(ogImage !== undefined && { ogImage }),
        ...(ogImageAlt !== undefined && { ogImageAlt }),
        ...(ogType !== undefined && { ogType }),
        ...(ogUrl !== undefined && { ogUrl }),
        ...(ogSiteName !== undefined && { ogSiteName }),
        ...(ogLocale !== undefined && { ogLocale }),
        ...(twitterCard !== undefined && { twitterCard }),
        ...(twitterSite !== undefined && { twitterSite }),
        ...(twitterCreator !== undefined && { twitterCreator }),
        ...(twitterTitle !== undefined && { twitterTitle }),
        ...(twitterDescription !== undefined && { twitterDescription }),
        ...(twitterImage !== undefined && { twitterImage }),
        ...(twitterImageAlt !== undefined && { twitterImageAlt }),
        ...(canonical !== undefined && { canonical }),
        ...(robots !== undefined && { robots }),
        ...(viewport !== undefined && { viewport }),
        ...(structuredData !== undefined && { structuredData }),
        ...(customMeta !== undefined && { customMeta }),
        ...(referenceId !== undefined && { referenceId }),
        ...(referenceType !== undefined && { referenceType }),
        ...(isActive !== undefined && { isActive }),
        ...(isDefault !== undefined && { isDefault }),
        ...(priority !== undefined && { priority })
      },
      include: {
        createdBy: {
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
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete SEO meta entry
 */
const deleteSEOMeta = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.sEOMeta.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'SEO meta not found'
      });
    }

    await prisma.sEOMeta.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'SEO meta deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get page types and their SEO coverage
 */
const getPageTypesStats = async (req, res, next) => {
  try {
    const pageTypes = [
      'HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 
      'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 
      'NEWS_ARTICLE', 'SERVICE_PAGE', 'CUSTOM'
    ];

    const stats = await Promise.all(
      pageTypes.map(async (pageType) => {
        const total = await prisma.sEOMeta.count({
          where: { pageType, isActive: true }
        });

        const hasDefault = await prisma.sEOMeta.count({
          where: { pageType, isDefault: true, isActive: true }
        }) > 0;

        return {
          pageType,
          totalEntries: total,
          hasDefault,
          coverage: total > 0 ? 'configured' : 'missing'
        };
      })
    );

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate structured data for a page
 */
const generateStructuredData = async (req, res, next) => {
  try {
    const { pageType, referenceId } = req.body;

    let structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "South Pole",
      "url": "https://southpole.com",
      "logo": "https://southpole.com/logo.png",
      "description": "Leading provider of global sustainability solutions and services."
    };

    // Generate specific structured data based on page type
    if (pageType === 'HOME') {
      structuredData["@type"] = "Organization";
      structuredData.contactPoint = {
        "@type": "ContactPoint",
        "telephone": "+41-43-501-35-50",
        "contactType": "Customer Service"
      };
    } else if (pageType === 'NEWS_ARTICLE' && referenceId) {
      // Get news article data
      const article = await prisma.newsArticle.findUnique({
        where: { id: referenceId },
        include: { author: true, category: true }
      });

      if (article) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.excerpt,
          "author": {
            "@type": "Person",
            "name": article.author.name
          },
          "publisher": {
            "@type": "Organization",
            "name": "South Pole",
            "logo": "https://southpole.com/logo.png"
          },
          "datePublished": article.publishedAt?.toISOString(),
          "dateModified": article.updatedAt.toISOString(),
          "image": article.featuredImageUrl
        };
      }
    } else if (pageType === 'CASE_STUDY' && referenceId) {
      // Get case study data
      const caseStudy = await prisma.caseStudy.findUnique({
        where: { id: referenceId },
        include: { author: true, industry: true }
      });

      if (caseStudy) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": caseStudy.title,
          "description": caseStudy.summary,
          "author": {
            "@type": "Organization",
            "name": "South Pole"
          },
          "publisher": {
            "@type": "Organization",
            "name": "South Pole",
            "logo": "https://southpole.com/logo.png"
          },
          "datePublished": caseStudy.publishedAt?.toISOString(),
          "dateModified": caseStudy.updatedAt.toISOString(),
          "image": caseStudy.heroImageUrl
        };
      }
    }

    res.json({
      success: true,
      data: structuredData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPageSEO,
  getAllSEOMeta,
  getSEOMeta,
  createSEOMeta,
  updateSEOMeta,
  deleteSEOMeta,
  getPageTypesStats,
  generateStructuredData
};