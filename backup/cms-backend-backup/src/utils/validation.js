const Joi = require('joi');

// Common schemas
const idSchema = Joi.string().required();
const slugSchema = Joi.string().pattern(/^[a-z0-9-]+$/).min(1).max(100);
const statusSchema = Joi.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED');

// Auth schemas
const authSchemas = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).required(),
    role: Joi.string().valid('ADMIN', 'EDITOR', 'VIEWER').default('EDITOR')
  })
};

// Case Study schemas
const caseStudySchemas = {
  create: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    clientName: Joi.string().min(1).max(255).required(),
    heroImageUrl: Joi.string().uri().allow(''),
    summary: Joi.string().min(1).required(),
    theGoal: Joi.string().min(1).required(),
    theChallenge: Joi.string().min(1).required(),
    theSolution: Joi.string().min(1).required(),
    industryId: Joi.string().allow(null),
    serviceIds: Joi.array().items(Joi.string()).default([]),
    status: statusSchema.default('DRAFT'),
    metaTitle: Joi.string().max(255).allow(''),
    metaDescription: Joi.string().max(500).allow('')
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(255),
    clientName: Joi.string().min(1).max(255),
    heroImageUrl: Joi.string().uri().allow(''),
    summary: Joi.string().min(1),
    theGoal: Joi.string().min(1),
    theChallenge: Joi.string().min(1),
    theSolution: Joi.string().min(1),
    industryId: Joi.string().allow(null),
    serviceIds: Joi.array().items(Joi.string()),
    status: statusSchema,
    metaTitle: Joi.string().max(255).allow(''),
    metaDescription: Joi.string().max(500).allow('')
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: statusSchema,
    industry: Joi.string(),
    service: Joi.string(),
    search: Joi.string().max(255),
    sort: Joi.string().valid('title', 'clientName', 'createdAt', 'updatedAt', 'publishedAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
  })
};

// News Article schemas
const newsSchemas = {
  create: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    excerpt: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
    featuredImageUrl: Joi.string().uri().allow(''),
    categoryId: Joi.string().required(),
    status: statusSchema.default('DRAFT'),
    metaTitle: Joi.string().max(255).allow(''),
    metaDescription: Joi.string().max(500).allow(''),
    tags: Joi.array().items(Joi.string()).default([])
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(255),
    excerpt: Joi.string().min(1),
    content: Joi.string().min(1),
    featuredImageUrl: Joi.string().uri().allow(''),
    categoryId: Joi.string(),
    status: statusSchema,
    metaTitle: Joi.string().max(255).allow(''),
    metaDescription: Joi.string().max(500).allow(''),
    tags: Joi.array().items(Joi.string())
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: statusSchema,
    category: Joi.string(),
    search: Joi.string().max(255),
    sort: Joi.string().valid('title', 'createdAt', 'updatedAt', 'publishedAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
  })
};

// Service schemas
const serviceSchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().allow(''),
    iconUrl: Joi.string().uri().allow(''),
    color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).allow('')
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(255),
    description: Joi.string().allow(''),
    iconUrl: Joi.string().uri().allow(''),
    color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).allow(''),
    isActive: Joi.boolean()
  })
};

// Industry schemas
const industrySchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().allow('')
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(255),
    description: Joi.string().allow(''),
    isActive: Joi.boolean()
  })
};

// Category schemas
const categorySchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().allow(''),
    color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).allow('')
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(255),
    description: Joi.string().allow(''),
    color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).allow(''),
    isActive: Joi.boolean()
  })
};

// User schemas
const userSchemas = {
  create: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(100).required(),
    role: Joi.string().valid('ADMIN', 'EDITOR', 'VIEWER').default('EDITOR'),
    avatarUrl: Joi.string().uri().allow('')
  }),

  update: Joi.object({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(100),
    role: Joi.string().valid('ADMIN', 'EDITOR', 'VIEWER'),
    avatarUrl: Joi.string().uri().allow(''),
    isActive: Joi.boolean()
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100),
    avatarUrl: Joi.string().uri().allow('')
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  })
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
        field: error.details[0].path[0]
      });
    }
    
    req.body = value;
    next();
  };
};

// Query validation middleware
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
        field: error.details[0].path[0]
      });
    }
    
    req.query = value;
    next();
  };
};

// Company schemas
const companySchemas = {
  createInfo: Joi.object({
    section: Joi.string().valid('HERO', 'MISSION', 'VALUES', 'HISTORY', 'COMMITMENT', 'IMPACT').required(),
    title: Joi.string().min(1).max(255).required(),
    subtitle: Joi.string().allow(''),
    content: Joi.string().min(1).required(),
    imageUrl: Joi.string().uri().allow(''),
    videoUrl: Joi.string().uri().allow(''),
    ctaText: Joi.string().max(100).allow(''),
    ctaUrl: Joi.string().uri().allow(''),
    displayOrder: Joi.number().integer().min(0)
  }),

  updateInfo: Joi.object({
    section: Joi.string().valid('HERO', 'MISSION', 'VALUES', 'HISTORY', 'COMMITMENT', 'IMPACT'),
    title: Joi.string().min(1).max(255),
    subtitle: Joi.string().allow(''),
    content: Joi.string().min(1),
    imageUrl: Joi.string().uri().allow(''),
    videoUrl: Joi.string().uri().allow(''),
    ctaText: Joi.string().max(100).allow(''),
    ctaUrl: Joi.string().uri().allow(''),
    displayOrder: Joi.number().integer().min(0),
    isActive: Joi.boolean()
  }),

  createStats: Joi.object({
    label: Joi.string().min(1).max(100).required(),
    value: Joi.string().min(1).max(50).required(),
    description: Joi.string().allow(''),
    iconUrl: Joi.string().uri().allow(''),
    displayOrder: Joi.number().integer().min(0)
  }),

  updateStats: Joi.object({
    label: Joi.string().min(1).max(100),
    value: Joi.string().min(1).max(50),
    description: Joi.string().allow(''),
    iconUrl: Joi.string().uri().allow(''),
    displayOrder: Joi.number().integer().min(0),
    isActive: Joi.boolean()
  })
};

// Team Member schemas
const teamMemberSchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(255).required(),
    title: Joi.string().min(1).max(255).required(),
    department: Joi.string().max(255).allow(''),
    bio: Joi.string().allow(''),
    imageUrl: Joi.string().uri().allow(''),
    linkedinUrl: Joi.string().uri().allow(''),
    email: Joi.string().email().allow(''),
    isLeadership: Joi.boolean().default(false),
    displayOrder: Joi.number().integer().min(0)
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(255),
    title: Joi.string().min(1).max(255),
    department: Joi.string().max(255).allow(''),
    bio: Joi.string().allow(''),
    imageUrl: Joi.string().uri().allow(''),
    linkedinUrl: Joi.string().uri().allow(''),
    email: Joi.string().email().allow(''),
    isLeadership: Joi.boolean(),
    displayOrder: Joi.number().integer().min(0),
    isActive: Joi.boolean()
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    isLeadership: Joi.string().valid('true', 'false'),
    isActive: Joi.string().valid('true', 'false'),
    department: Joi.string().max(255),
    search: Joi.string().max(255),
    sort: Joi.string().valid('name', 'title', 'department', 'displayOrder', 'createdAt').default('name'),
    order: Joi.string().valid('asc', 'desc').default('asc')
  }),

  updateDisplayOrder: Joi.object({
    updates: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        displayOrder: Joi.number().integer().min(0).required()
      })
    ).min(1).required()
  })
};

// Office Location schemas
const locationSchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(255).required(),
    address: Joi.string().min(1).required(),
    city: Joi.string().min(1).max(255).required(),
    country: Joi.string().min(1).max(255).required(),
    countryCode: Joi.string().length(2).uppercase().allow(''),
    phone: Joi.string().max(50).allow(''),
    email: Joi.string().email().allow(''),
    timezone: Joi.string().max(100).allow(''),
    coordinates: Joi.string().pattern(/^-?\d+\.?\d*,-?\d+\.?\d*$/).allow(''), // lat,lng format
    description: Joi.string().allow(''),
    imageUrl: Joi.string().uri().allow(''),
    isHeadquarters: Joi.boolean().default(false)
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(255),
    address: Joi.string().min(1),
    city: Joi.string().min(1).max(255),
    country: Joi.string().min(1).max(255),
    countryCode: Joi.string().length(2).uppercase().allow(''),
    phone: Joi.string().max(50).allow(''),
    email: Joi.string().email().allow(''),
    timezone: Joi.string().max(100).allow(''),
    coordinates: Joi.string().pattern(/^-?\d+\.?\d*,-?\d+\.?\d*$/).allow(''),
    description: Joi.string().allow(''),
    imageUrl: Joi.string().uri().allow(''),
    isHeadquarters: Joi.boolean(),
    isActive: Joi.boolean()
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    isActive: Joi.string().valid('true', 'false'),
    isHeadquarters: Joi.string().valid('true', 'false'),
    country: Joi.string().max(255),
    search: Joi.string().max(255),
    sort: Joi.string().valid('name', 'city', 'country', 'createdAt').default('country'),
    order: Joi.string().valid('asc', 'desc').default('asc')
  })
};

// Contact Form schemas
const contactFormSchemas = {
  submit: Joi.object({
    type: Joi.string().valid('GENERAL', 'PARTNERSHIP', 'MEDIA', 'CAREER', 'SUPPORT', 'CONSULTATION').default('GENERAL'),
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().max(50).allow(''),
    company: Joi.string().max(255).allow(''),
    jobTitle: Joi.string().max(255).allow(''),
    country: Joi.string().max(100).allow(''),
    subject: Joi.string().min(1).max(255).required(),
    message: Joi.string().min(10).required(),
    source: Joi.string().max(100).allow('')
  }),

  update: Joi.object({
    status: Joi.string().valid('NEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
    assignedToId: Joi.string().allow(null),
    responseText: Joi.string().allow('')
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    type: Joi.string().valid('GENERAL', 'PARTNERSHIP', 'MEDIA', 'CAREER', 'SUPPORT', 'CONSULTATION'),
    status: Joi.string().valid('NEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
    assignedToId: Joi.string(),
    dateFrom: Joi.date().iso(),
    dateTo: Joi.date().iso(),
    search: Joi.string().max(255),
    sort: Joi.string().valid('name', 'email', 'company', 'type', 'status', 'priority', 'submittedAt').default('submittedAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
  }),

  bulkAssign: Joi.object({
    formIds: Joi.array().items(Joi.string()).min(1).required(),
    assignedToId: Joi.string().allow(null).required()
  }),

  stats: Joi.object({
    period: Joi.string().valid('7d', '30d', '90d', '1y', 'all').default('30d')
  })
};

// SEO Meta schemas
const seoMetaSchemas = {
  create: Joi.object({
    pageType: Joi.string().valid('HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 'NEWS_ARTICLE', 'SERVICE_PAGE', 'CUSTOM').required(),
    pagePath: Joi.string().max(500).allow(''),
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(500).required(),
    keywords: Joi.string().max(1000).allow(''),
    
    // OpenGraph
    ogTitle: Joi.string().max(255).allow(''),
    ogDescription: Joi.string().max(500).allow(''),
    ogImage: Joi.string().uri().allow(''),
    ogImageAlt: Joi.string().max(255).allow(''),
    ogType: Joi.string().max(50).allow(''),
    ogUrl: Joi.string().uri().allow(''),
    ogSiteName: Joi.string().max(100).allow(''),
    ogLocale: Joi.string().max(10).allow(''),
    
    // Twitter
    twitterCard: Joi.string().valid('summary', 'summary_large_image', 'app', 'player').allow(''),
    twitterSite: Joi.string().max(50).allow(''),
    twitterCreator: Joi.string().max(50).allow(''),
    twitterTitle: Joi.string().max(255).allow(''),
    twitterDescription: Joi.string().max(500).allow(''),
    twitterImage: Joi.string().uri().allow(''),
    twitterImageAlt: Joi.string().max(255).allow(''),
    
    // Advanced
    canonical: Joi.string().uri().allow(''),
    robots: Joi.string().max(100).allow(''),
    viewport: Joi.string().max(200).allow(''),
    structuredData: Joi.object().allow(null),
    customMeta: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        property: Joi.string(),
        content: Joi.string().required()
      }).xor('name', 'property')
    ).allow(null),
    
    // References
    referenceId: Joi.string().allow(''),
    referenceType: Joi.string().max(50).allow(''),
    
    // Management
    isDefault: Joi.boolean().default(false),
    priority: Joi.number().integer().min(0).max(100).default(0)
  }),

  update: Joi.object({
    pageType: Joi.string().valid('HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 'NEWS_ARTICLE', 'SERVICE_PAGE', 'CUSTOM'),
    pagePath: Joi.string().max(500).allow(''),
    title: Joi.string().min(1).max(255),
    description: Joi.string().min(1).max(500),
    keywords: Joi.string().max(1000).allow(''),
    
    // OpenGraph
    ogTitle: Joi.string().max(255).allow(''),
    ogDescription: Joi.string().max(500).allow(''),
    ogImage: Joi.string().uri().allow(''),
    ogImageAlt: Joi.string().max(255).allow(''),
    ogType: Joi.string().max(50).allow(''),
    ogUrl: Joi.string().uri().allow(''),
    ogSiteName: Joi.string().max(100).allow(''),
    ogLocale: Joi.string().max(10).allow(''),
    
    // Twitter
    twitterCard: Joi.string().valid('summary', 'summary_large_image', 'app', 'player').allow(''),
    twitterSite: Joi.string().max(50).allow(''),
    twitterCreator: Joi.string().max(50).allow(''),
    twitterTitle: Joi.string().max(255).allow(''),
    twitterDescription: Joi.string().max(500).allow(''),
    twitterImage: Joi.string().uri().allow(''),
    twitterImageAlt: Joi.string().max(255).allow(''),
    
    // Advanced
    canonical: Joi.string().uri().allow(''),
    robots: Joi.string().max(100).allow(''),
    viewport: Joi.string().max(200).allow(''),
    structuredData: Joi.object().allow(null),
    customMeta: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        property: Joi.string(),
        content: Joi.string().required()
      }).xor('name', 'property')
    ).allow(null),
    
    // References
    referenceId: Joi.string().allow(''),
    referenceType: Joi.string().max(50).allow(''),
    
    // Management
    isActive: Joi.boolean(),
    isDefault: Joi.boolean(),
    priority: Joi.number().integer().min(0).max(100)
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    pageType: Joi.string().valid('HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 'NEWS_ARTICLE', 'SERVICE_PAGE', 'CUSTOM'),
    isActive: Joi.string().valid('true', 'false'),
    isDefault: Joi.string().valid('true', 'false'),
    referenceType: Joi.string().max(50),
    search: Joi.string().max(255),
    sort: Joi.string().valid('title', 'pageType', 'priority', 'createdAt').default('pageType'),
    order: Joi.string().valid('asc', 'desc').default('asc')
  }),

  getPageSEO: Joi.object({
    pageType: Joi.string().valid('HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 'NEWS_ARTICLE', 'SERVICE_PAGE', 'CUSTOM').required(),
    pagePath: Joi.string().max(500),
    referenceId: Joi.string()
  }),

  generateStructuredData: Joi.object({
    pageType: Joi.string().valid('HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 'NEWS_ARTICLE', 'SERVICE_PAGE', 'CUSTOM').required(),
    referenceId: Joi.string().allow('')
  })
};

module.exports = {
  authSchemas,
  caseStudySchemas,
  newsSchemas,
  serviceSchemas,
  industrySchemas,
  categorySchemas,
  userSchemas,
  companySchemas,
  teamMemberSchemas,
  locationSchemas,
  contactFormSchemas,
  seoMetaSchemas,
  validate,
  validateQuery
};