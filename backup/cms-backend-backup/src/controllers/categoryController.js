const prisma = require('../utils/database');
const { 
  generateUniqueSlug, 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all categories with pagination and filters
 */
const getAllCategories = async (req, res, next) => {
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
    const total = await prisma.category.count({ where });

    // Get categories
    const categories = await prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        _count: {
          select: {
            newsArticles: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: categories,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single category by ID or slug
 */
const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid CUID or slug
    const where = id.includes('-') && !id.startsWith('c') 
      ? { slug: id }
      : { id };

    const category = await prisma.category.findUnique({
      where,
      include: {
        newsArticles: {
          where: {
            status: 'PUBLISHED'
          },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            featuredImageUrl: true,
            publishedAt: true,
            author: {
              select: {
                id: true,
                name: true
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
            newsArticles: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new category
 */
const createCategory = async (req, res, next) => {
  try {
    const {
      name,
      description,
      color
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(name, prisma.category);

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        color
      }
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update category
 */
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      color,
      isActive
    } = req.body;

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Generate new slug if name changed
    let slug = existing.slug;
    if (name && name !== existing.name) {
      slug = await generateUniqueSlug(name, prisma.category, id);
    }

    // Update category
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(color !== undefined && { color }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category
 */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            newsArticles: true
          }
        }
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Check if category has news articles
    if (existing._count.newsArticles > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete category with associated news articles'
      });
    }

    // Delete category
    await prisma.category.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get category statistics
 */
const getCategoryStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            newsArticles: true
          }
        },
        newsArticles: {
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

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    const publishedCount = await prisma.newsArticle.count({
      where: {
        categoryId: id,
        status: 'PUBLISHED'
      }
    });

    const stats = {
      totalArticles: category._count.newsArticles,
      publishedArticles: publishedCount,
      latestArticle: category.newsArticles.length > 0 
        ? category.newsArticles[0].publishedAt 
        : null
    };

    res.json({
      success: true,
      data: {
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug
        },
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryStats
};