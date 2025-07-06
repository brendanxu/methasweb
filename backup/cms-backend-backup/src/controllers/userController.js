const bcrypt = require('bcryptjs');
const prisma = require('../utils/database');
const { 
  sanitizeUser,
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all users with pagination and filters
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = extractPaginationParams(req.query);
    const { search, sort, order, role, isActive } = req.query;

    // Build where clause
    let where = {};

    // Role filter
    if (role) {
      where.role = role;
    }

    // Active filter
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    // Search filter
    if (search) {
      where = {
        ...where,
        ...buildSearchWhere(search, ['name', 'email'])
      };
    }

    // Count total items
    const total = await prisma.user.count({ where });

    // Get users
    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        _count: {
          select: {
            caseStudies: true,
            newsArticles: true,
            mediaFiles: true
          }
        }
      }
    });

    // Sanitize user data
    const sanitizedUsers = users.map(user => ({
      ...sanitizeUser(user),
      _count: user._count
    }));

    res.json({
      success: true,
      data: sanitizedUsers,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single user by ID
 */
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            caseStudies: true,
            newsArticles: true,
            mediaFiles: true
          }
        },
        caseStudies: {
          select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        newsArticles: {
          select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        ...sanitizeUser(user),
        _count: user._count,
        recentCaseStudies: user.caseStudies,
        recentNewsArticles: user.newsArticles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new user (Admin only)
 */
const createUser = async (req, res, next) => {
  try {
    const { email, password, name, role, avatarUrl } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        role: role || 'EDITOR',
        avatarUrl
      }
    });

    res.status(201).json({
      success: true,
      data: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, name, role, avatarUrl, isActive } = req.body;

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check email uniqueness if email is being changed
    if (email && email.toLowerCase() !== existing.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(email && { email: email.toLowerCase() }),
        ...(name && { name }),
        ...(role && { role }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            caseStudies: true,
            newsArticles: true,
            mediaFiles: true
          }
        }
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent deletion of user with content
    const hasContent = existing._count.caseStudies > 0 || 
                      existing._count.newsArticles > 0 || 
                      existing._count.mediaFiles > 0;

    if (hasContent) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete user with associated content. Please transfer content first.'
      });
    }

    // Prevent self-deletion
    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own account'
      });
    }

    // Delete user
    await prisma.user.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset user password (Admin only)
 */
const resetUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id },
      data: { passwordHash }
    });

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user statistics
 */
const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { isActive: true }
    });

    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        id: true
      }
    });

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        byRole: usersByRole.map(stat => ({
          role: stat.role,
          count: stat._count.id
        })),
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk update users
 */
const bulkUpdateUsers = async (req, res, next) => {
  try {
    const { userIds, action, data } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'User IDs array is required'
      });
    }

    let updateData = {};
    
    switch (action) {
      case 'activate':
        updateData = { isActive: true };
        break;
      case 'deactivate':
        updateData = { isActive: false };
        break;
      case 'changeRole':
        if (!data?.role) {
          return res.status(400).json({
            success: false,
            error: 'Role is required for role change action'
          });
        }
        updateData = { role: data.role };
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action'
        });
    }

    // Prevent self-deactivation
    if (action === 'deactivate' && userIds.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        error: 'Cannot deactivate your own account'
      });
    }

    // Update users
    const result = await prisma.user.updateMany({
      where: {
        id: {
          in: userIds
        }
      },
      data: updateData
    });

    res.json({
      success: true,
      message: `${result.count} users updated successfully`,
      data: {
        updatedCount: result.count
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
  getUserStats,
  bulkUpdateUsers
};