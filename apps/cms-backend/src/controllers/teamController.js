const prisma = require('../utils/database');
const { 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Get all team members with filtering and pagination
 */
const getAllTeamMembers = async (req, res, next) => {
  try {
    const { page, limit, sort, order } = extractPaginationParams(req.query);
    const { 
      isLeadership, 
      isActive, 
      department, 
      search 
    } = req.query;

    // Build where clause
    let where = {};

    if (isLeadership !== undefined) {
      where.isLeadership = isLeadership === 'true';
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (department) {
      where.department = {
        contains: department,
        mode: 'insensitive'
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build order by
    let orderBy = [];
    if (sort === 'name') {
      orderBy.push({ name: order });
    } else if (sort === 'title') {
      orderBy.push({ title: order });
    } else if (sort === 'department') {
      orderBy.push({ department: order });
    } else if (sort === 'displayOrder') {
      orderBy.push({ displayOrder: order });
    } else {
      // Default sorting: leadership first, then by display order, then by name
      orderBy = [
        { isLeadership: 'desc' },
        { displayOrder: 'asc' },
        { name: 'asc' }
      ];
    }

    // Get total count
    const total = await prisma.teamMember.count({ where });

    // Get team members
    const teamMembers = await prisma.teamMember.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    });

    const pagination = buildPaginationMeta(page, limit, total);

    res.json({
      success: true,
      data: teamMembers,
      pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get leadership team members
 */
const getLeadershipTeam = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const leadership = await prisma.teamMember.findMany({
      where: {
        isLeadership: true,
        isActive: true
      },
      orderBy: [
        { displayOrder: 'asc' },
        { name: 'asc' }
      ],
      take: parseInt(limit)
    });

    res.json({
      success: true,
      data: leadership
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get team members by department
 */
const getTeamByDepartment = async (req, res, next) => {
  try {
    const { department } = req.params;
    const { isActive = 'true' } = req.query;

    const teamMembers = await prisma.teamMember.findMany({
      where: {
        department: {
          contains: department,
          mode: 'insensitive'
        },
        isActive: isActive === 'true'
      },
      orderBy: [
        { isLeadership: 'desc' },
        { displayOrder: 'asc' },
        { name: 'asc' }
      ]
    });

    res.json({
      success: true,
      data: teamMembers
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single team member
 */
const getTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teamMember = await prisma.teamMember.findUnique({
      where: { id }
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create team member
 */
const createTeamMember = async (req, res, next) => {
  try {
    const {
      name,
      title,
      department,
      bio,
      imageUrl,
      linkedinUrl,
      email,
      isLeadership,
      displayOrder
    } = req.body;

    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        title,
        department,
        bio,
        imageUrl,
        linkedinUrl,
        email,
        isLeadership: isLeadership || false,
        displayOrder
      }
    });

    res.status(201).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update team member
 */
const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      title,
      department,
      bio,
      imageUrl,
      linkedinUrl,
      email,
      isLeadership,
      displayOrder,
      isActive
    } = req.body;

    // Check if exists
    const existing = await prisma.teamMember.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found'
      });
    }

    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(title !== undefined && { title }),
        ...(department !== undefined && { department }),
        ...(bio !== undefined && { bio }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(linkedinUrl !== undefined && { linkedinUrl }),
        ...(email !== undefined && { email }),
        ...(isLeadership !== undefined && { isLeadership }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete team member
 */
const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.teamMember.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found'
      });
    }

    await prisma.teamMember.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get departments list
 */
const getDepartments = async (req, res, next) => {
  try {
    const departments = await prisma.teamMember.findMany({
      where: {
        department: { not: null },
        isActive: true
      },
      select: {
        department: true
      },
      distinct: ['department']
    });

    // Extract unique departments and count members
    const departmentStats = await Promise.all(
      departments.map(async (dept) => {
        const count = await prisma.teamMember.count({
          where: {
            department: dept.department,
            isActive: true
          }
        });

        const leadershipCount = await prisma.teamMember.count({
          where: {
            department: dept.department,
            isActive: true,
            isLeadership: true
          }
        });

        return {
          name: dept.department,
          totalMembers: count,
          leadershipMembers: leadershipCount
        };
      })
    );

    res.json({
      success: true,
      data: departmentStats.sort((a, b) => a.name.localeCompare(b.name))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update team member display order
 */
const updateDisplayOrder = async (req, res, next) => {
  try {
    const { updates } = req.body; // Array of { id, displayOrder }

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        error: 'Updates must be an array'
      });
    }

    // Use transaction for batch update
    const result = await prisma.$transaction(
      updates.map(({ id, displayOrder }) =>
        prisma.teamMember.update({
          where: { id },
          data: { displayOrder }
        })
      )
    );

    res.json({
      success: true,
      data: result,
      message: `Updated display order for ${result.length} team members`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeamMembers,
  getLeadershipTeam,
  getTeamByDepartment,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getDepartments,
  updateDisplayOrder
};