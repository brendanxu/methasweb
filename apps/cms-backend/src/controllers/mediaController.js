const prisma = require('../utils/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { 
  buildPaginationMeta, 
  buildSearchWhere,
  buildOrderBy,
  extractPaginationParams
} = require('../utils/helpers');

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Create upload directory if it doesn't exist
const ensureUploadDir = async () => {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureUploadDir();
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/**
 * Get all media files with pagination and filters
 */
const getAllMedia = async (req, res, next) => {
  try {
    const { page, limit, skip } = extractPaginationParams(req.query);
    const { search, sort, order, type, uploadedBy } = req.query;

    // Build where clause
    let where = {};

    // Type filter
    if (type) {
      where.type = type;
    }

    // Uploaded by filter
    if (uploadedBy) {
      where.uploadedById = uploadedBy;
    }

    // Search filter
    if (search) {
      where = {
        ...where,
        ...buildSearchWhere(search, ['filename', 'originalName', 'alt'])
      };
    }

    // Count total items
    const total = await prisma.mediaFile.count({ where });

    // Get media files
    const mediaFiles = await prisma.mediaFile.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        uploadedBy: {
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
      data: mediaFiles,
      meta: buildPaginationMeta(page, limit, total)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single media file
 */
const getMediaFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mediaFile = await prisma.mediaFile.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!mediaFile) {
      return res.status(404).json({
        success: false,
        error: 'Media file not found'
      });
    }

    res.json({
      success: true,
      data: mediaFile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload single file
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file provided'
      });
    }

    const { alt, caption } = req.body;
    const file = req.file;

    // Determine file type
    let type = 'OTHER';
    if (file.mimetype.startsWith('image/')) {
      type = 'IMAGE';
    } else if (file.mimetype === 'application/pdf') {
      type = 'DOCUMENT';
    }

    // Generate public URL
    const url = `/uploads/${file.filename}`;

    // Save to database
    const mediaFile = await prisma.mediaFile.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url,
        type,
        alt: alt || '',
        caption: caption || '',
        uploadedById: req.user.id
      },
      include: {
        uploadedBy: {
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
      data: mediaFile
    });
  } catch (error) {
    // Clean up file if database save fails
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    }
    next(error);
  }
};

/**
 * Upload multiple files
 */
const uploadMultipleFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files provided'
      });
    }

    const uploadedFiles = [];
    const failedFiles = [];

    for (const file of req.files) {
      try {
        // Determine file type
        let type = 'OTHER';
        if (file.mimetype.startsWith('image/')) {
          type = 'IMAGE';
        } else if (file.mimetype === 'application/pdf') {
          type = 'DOCUMENT';
        }

        // Generate public URL
        const url = `/uploads/${file.filename}`;

        // Save to database
        const mediaFile = await prisma.mediaFile.create({
          data: {
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url,
            type,
            uploadedById: req.user.id
          }
        });

        uploadedFiles.push(mediaFile);
      } catch (error) {
        failedFiles.push({
          filename: file.originalname,
          error: error.message
        });
        
        // Clean up file
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error('Failed to delete uploaded file:', unlinkError);
        }
      }
    }

    res.status(201).json({
      success: true,
      data: {
        uploaded: uploadedFiles,
        failed: failedFiles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update media file metadata
 */
const updateMediaFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { alt, caption } = req.body;

    // Check if media file exists
    const existing = await prisma.mediaFile.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Media file not found'
      });
    }

    // Update media file
    const mediaFile = await prisma.mediaFile.update({
      where: { id },
      data: {
        ...(alt !== undefined && { alt }),
        ...(caption !== undefined && { caption })
      },
      include: {
        uploadedBy: {
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
      data: mediaFile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete media file
 */
const deleteMediaFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if media file exists
    const existing = await prisma.mediaFile.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Media file not found'
      });
    }

    // Delete file from filesystem
    const filePath = path.join(uploadDir, existing.filename);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Failed to delete file from filesystem:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await prisma.mediaFile.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Media file deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get media statistics
 */
const getMediaStats = async (req, res, next) => {
  try {
    const stats = await prisma.mediaFile.groupBy({
      by: ['type'],
      _count: {
        id: true
      },
      _sum: {
        size: true
      }
    });

    const totalFiles = await prisma.mediaFile.count();
    const totalSize = await prisma.mediaFile.aggregate({
      _sum: {
        size: true
      }
    });

    res.json({
      success: true,
      data: {
        totalFiles,
        totalSize: totalSize._sum.size || 0,
        byType: stats.map(stat => ({
          type: stat.type,
          count: stat._count.id,
          size: stat._sum.size || 0
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedia,
  getMediaFile,
  uploadFile,
  uploadMultipleFiles,
  updateMediaFile,
  deleteMediaFile,
  getMediaStats,
  upload
};