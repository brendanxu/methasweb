const prisma = require('../utils/database');
const { 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

/**
 * Submit a new contact form (Public endpoint)
 */
const submitContactForm = async (req, res, next) => {
  try {
    const {
      type,
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      country,
      subject,
      message,
      source
    } = req.body;

    // Extract metadata from request
    const metadata = {
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip || req.connection.remoteAddress,
      referrer: req.get('Referer'),
      source: source || 'website'
    };

    const contactForm = await prisma.contactForm.create({
      data: {
        type: type ? type.toUpperCase() : 'GENERAL',
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
        country,
        subject,
        message,
        ...metadata
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: contactForm.id,
        submittedAt: contactForm.submittedAt
      },
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all contact forms with filtering and pagination (Admin)
 */
const getAllContactForms = async (req, res, next) => {
  try {
    const { page, limit, sort, order } = extractPaginationParams(req.query);
    const { 
      type, 
      status, 
      priority,
      assignedToId,
      dateFrom,
      dateTo,
      search 
    } = req.query;

    // Build where clause
    let where = {};

    if (type) {
      where.type = type.toUpperCase();
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    if (priority) {
      where.priority = priority.toUpperCase();
    }

    if (assignedToId) {
      where.assignedToId = assignedToId;
    }

    if (dateFrom || dateTo) {
      where.submittedAt = {};
      if (dateFrom) {
        where.submittedAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.submittedAt.lte = new Date(dateTo);
      }
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build order by
    let orderBy = [];
    if (sort === 'name') {
      orderBy = [{ firstName: order }, { lastName: order }];
    } else if (sort === 'email') {
      orderBy.push({ email: order });
    } else if (sort === 'company') {
      orderBy.push({ company: order });
    } else if (sort === 'type') {
      orderBy.push({ type: order });
    } else if (sort === 'status') {
      orderBy.push({ status: order });
    } else if (sort === 'priority') {
      orderBy.push({ priority: order });
    } else {
      // Default: urgent first, then by submission date (newest first)
      orderBy = [
        { priority: 'desc' },
        { submittedAt: 'desc' }
      ];
    }

    // Get total count
    const total = await prisma.contactForm.count({ where });

    // Get contact forms
    const contactForms = await prisma.contactForm.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        assignedTo: {
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
      data: contactForms,
      pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single contact form
 */
const getContactForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contactForm = await prisma.contactForm.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!contactForm) {
      return res.status(404).json({
        success: false,
        error: 'Contact form not found'
      });
    }

    res.json({
      success: true,
      data: contactForm
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update contact form status/assignment
 */
const updateContactForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      status,
      priority,
      assignedToId,
      responseText
    } = req.body;

    // Check if exists
    const existing = await prisma.contactForm.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Contact form not found'
      });
    }

    // If assigning to someone, update status to ASSIGNED
    let updateData = {};
    
    if (status !== undefined) {
      updateData.status = status.toUpperCase();
    }
    
    if (priority !== undefined) {
      updateData.priority = priority.toUpperCase();
    }
    
    if (assignedToId !== undefined) {
      updateData.assignedToId = assignedToId;
      if (assignedToId && existing.status === 'NEW') {
        updateData.status = 'ASSIGNED';
      }
    }

    if (responseText !== undefined) {
      updateData.responseText = responseText;
      if (responseText && !existing.responseDate) {
        updateData.responseDate = new Date();
      }
    }

    const contactForm = await prisma.contactForm.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
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
      data: contactForm
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete contact form
 */
const deleteContactForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.contactForm.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Contact form not found'
      });
    }

    await prisma.contactForm.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Contact form deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get contact form statistics
 */
const getContactStats = async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range
    let dateFrom = new Date();
    if (period === '7d') {
      dateFrom.setDate(dateFrom.getDate() - 7);
    } else if (period === '30d') {
      dateFrom.setDate(dateFrom.getDate() - 30);
    } else if (period === '90d') {
      dateFrom.setDate(dateFrom.getDate() - 90);
    } else if (period === '1y') {
      dateFrom.setFullYear(dateFrom.getFullYear() - 1);
    }

    const whereClause = period !== 'all' ? {
      submittedAt: { gte: dateFrom }
    } : {};

    // Get basic counts
    const [
      totalForms,
      newForms,
      assignedForms,
      inProgressForms,
      resolvedForms,
      closedForms
    ] = await Promise.all([
      prisma.contactForm.count({ where: whereClause }),
      prisma.contactForm.count({ where: { ...whereClause, status: 'NEW' } }),
      prisma.contactForm.count({ where: { ...whereClause, status: 'ASSIGNED' } }),
      prisma.contactForm.count({ where: { ...whereClause, status: 'IN_PROGRESS' } }),
      prisma.contactForm.count({ where: { ...whereClause, status: 'RESOLVED' } }),
      prisma.contactForm.count({ where: { ...whereClause, status: 'CLOSED' } })
    ]);

    // Get forms by type
    const formsByType = await prisma.contactForm.groupBy({
      by: ['type'],
      where: whereClause,
      _count: true
    });

    // Get forms by priority
    const formsByPriority = await prisma.contactForm.groupBy({
      by: ['priority'],
      where: whereClause,
      _count: true
    });

    // Get average response time (for resolved forms)
    const resolvedWithResponse = await prisma.contactForm.findMany({
      where: {
        ...whereClause,
        status: 'RESOLVED',
        responseDate: { not: null }
      },
      select: {
        submittedAt: true,
        responseDate: true
      }
    });

    let averageResponseTimeHours = 0;
    if (resolvedWithResponse.length > 0) {
      const totalResponseTime = resolvedWithResponse.reduce((sum, form) => {
        const responseTime = form.responseDate.getTime() - form.submittedAt.getTime();
        return sum + responseTime;
      }, 0);
      averageResponseTimeHours = Math.round(totalResponseTime / (resolvedWithResponse.length * 1000 * 60 * 60));
    }

    res.json({
      success: true,
      data: {
        period,
        totalForms,
        statusBreakdown: {
          new: newForms,
          assigned: assignedForms,
          inProgress: inProgressForms,
          resolved: resolvedForms,
          closed: closedForms
        },
        typeBreakdown: formsByType.reduce((acc, item) => {
          acc[item.type.toLowerCase()] = item._count;
          return acc;
        }, {}),
        priorityBreakdown: formsByPriority.reduce((acc, item) => {
          acc[item.priority.toLowerCase()] = item._count;
          return acc;
        }, {}),
        averageResponseTimeHours,
        responseRate: totalForms > 0 ? Math.round((resolvedWithResponse.length / totalForms) * 100) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Assign multiple contact forms to a user
 */
const bulkAssign = async (req, res, next) => {
  try {
    const { formIds, assignedToId } = req.body;

    if (!Array.isArray(formIds) || formIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'formIds must be a non-empty array'
      });
    }

    // Verify assignee exists if provided
    if (assignedToId) {
      const assignee = await prisma.user.findUnique({
        where: { id: assignedToId }
      });

      if (!assignee) {
        return res.status(404).json({
          success: false,
          error: 'Assigned user not found'
        });
      }
    }

    // Update forms
    const updateData = {
      assignedToId: assignedToId || null,
      updatedAt: new Date()
    };

    // If assigning to someone, update NEW forms to ASSIGNED
    if (assignedToId) {
      // Update NEW forms to ASSIGNED, others keep their status
      const [newForms, otherForms] = await Promise.all([
        prisma.contactForm.updateMany({
          where: {
            id: { in: formIds },
            status: 'NEW'
          },
          data: {
            ...updateData,
            status: 'ASSIGNED'
          }
        }),
        prisma.contactForm.updateMany({
          where: {
            id: { in: formIds },
            status: { not: 'NEW' }
          },
          data: updateData
        })
      ]);

      const totalUpdated = newForms.count + otherForms.count;

      res.json({
        success: true,
        message: `Successfully assigned ${totalUpdated} forms`,
        data: { 
          updatedCount: totalUpdated,
          assignedNewForms: newForms.count,
          updatedExistingForms: otherForms.count
        }
      });
    } else {
      // Unassigning - just clear assignedToId
      const result = await prisma.contactForm.updateMany({
        where: { id: { in: formIds } },
        data: updateData
      });

      res.json({
        success: true,
        message: `Successfully unassigned ${result.count} forms`,
        data: { updatedCount: result.count }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getAllContactForms,
  getContactForm,
  updateContactForm,
  deleteContactForm,
  getContactStats,
  bulkAssign
};