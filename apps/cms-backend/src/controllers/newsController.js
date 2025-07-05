const prisma = require('../utils/database');
const { 
  generateUniqueSlug, 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all news articles with pagination and filters
 */
const getAllNewsArticles = async (req, res, next) => {
  try {
    const { page, limit, skip } = extractPaginationParams(req.query);
    const { status, category, search, sort, order } = req.query;

    // Build where clause
    let where = {};

    // Status filter
    if (status) {
      where.status = status;
    }

    // Category filter
    if (category) {
      where.category = {
        slug: category
      };
    }

    // Search filter
    if (search) {
      where = {
        ...where,
        ...buildSearchWhere(search, ['title', 'excerpt', 'content'])
      };
    }

    // Count total items
    const total = await prisma.newsArticle.count({ where });

    // Get news articles
    const newsArticles = await prisma.newsArticle.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        category: true,
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
      data: newsArticles,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single news article by ID or slug
 */
const getNewsArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid CUID or slug
    const where = id.includes('-') && !id.startsWith('c') 
      ? { slug: id }
      : { id };

    const newsArticle = await prisma.newsArticle.findUnique({
      where,
      include: {
        category: true,
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

    if (!newsArticle) {
      return res.status(404).json({
        success: false,
        error: 'News article not found'
      });
    }

    res.json({
      success: true,
      data: newsArticle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new news article
 */
const createNewsArticle = async (req, res, next) => {
  try {
    const {
      title,
      excerpt,
      content,
      featuredImageUrl,
      categoryId,
      status,
      metaTitle,
      metaDescription,
      tags = []
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(title, prisma.newsArticle);

    // Create news article
    const newsArticle = await prisma.newsArticle.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        featuredImageUrl,
        categoryId,
        authorId: req.user.id,
        status: status || 'DRAFT',
        metaTitle,
        metaDescription,
        tags,
        publishedAt: status === 'PUBLISHED' ? new Date() : null
      },
      include: {
        category: true,
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
      data: newsArticle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update news article
 */
const updateNewsArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      excerpt,
      content,
      featuredImageUrl,
      categoryId,
      status,
      metaTitle,
      metaDescription,
      tags
    } = req.body;

    // Check if news article exists
    const existing = await prisma.newsArticle.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'News article not found'
      });
    }

    // Generate new slug if title changed
    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = await generateUniqueSlug(title, prisma.newsArticle, id);
    }

    // Update news article
    const newsArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        ...(title && { title, slug }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(featuredImageUrl !== undefined && { featuredImageUrl }),
        ...(categoryId !== undefined && { categoryId }),
        ...(status && { 
          status,
          publishedAt: status === 'PUBLISHED' && !existing.publishedAt 
            ? new Date() 
            : existing.publishedAt
        }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(tags !== undefined && { tags })
      },
      include: {
        category: true,
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
      data: newsArticle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete news article
 */
const deleteNewsArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if news article exists
    const existing = await prisma.newsArticle.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'News article not found'
      });
    }

    // Delete news article
    await prisma.newsArticle.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'News article deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Publish news article
 */
const publishNewsArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newsArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: newsArticle,
      message: 'News article published successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unpublish news article
 */
const unpublishNewsArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newsArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        status: 'DRAFT'
      }
    });

    res.json({
      success: true,
      data: newsArticle,
      message: 'News article unpublished successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNewsArticles,
  getNewsArticle,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  publishNewsArticle,
  unpublishNewsArticle
};