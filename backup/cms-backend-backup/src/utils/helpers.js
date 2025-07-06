/**
 * Generate unique slug from title
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Generate unique slug with suffix if needed
 */
const generateUniqueSlug = async (title, model, excludeId = null) => {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await model.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

/**
 * Build pagination metadata
 */
const buildPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  };
};

/**
 * Build Prisma where clause for search
 */
const buildSearchWhere = (searchTerm, fields) => {
  if (!searchTerm) return {};

  return {
    OR: fields.map(field => ({
      [field]: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }))
  };
};

/**
 * Sanitize user data for response
 */
const sanitizeUser = (user) => {
  const { passwordHash, ...sanitized } = user;
  return sanitized;
};

/**
 * Validate file type for uploads
 */
const isValidImageType = (mimetype) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  return allowedTypes.includes(mimetype);
};

/**
 * Format file size in human readable format
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Build order by clause for Prisma
 */
const buildOrderBy = (sort, order = 'desc') => {
  const validOrders = ['asc', 'desc'];
  const sanitizedOrder = validOrders.includes(order.toLowerCase()) ? order.toLowerCase() : 'desc';
  
  if (!sort) {
    return { createdAt: sanitizedOrder };
  }
  
  return { [sort]: sanitizedOrder };
};

/**
 * Extract pagination params from query
 */
const extractPaginationParams = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

/**
 * Handle async route wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  generateSlug,
  generateUniqueSlug,
  buildPaginationMeta,
  buildSearchWhere,
  sanitizeUser,
  isValidImageType,
  formatFileSize,
  buildOrderBy,
  extractPaginationParams,
  asyncHandler
};