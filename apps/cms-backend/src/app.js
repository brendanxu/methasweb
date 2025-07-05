const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import database
const prisma = require('./utils/database');

// Import routes
const authRoutes = require('./routes/auth');
const caseStudyRoutes = require('./routes/caseStudies');
const newsRoutes = require('./routes/news');
const serviceRoutes = require('./routes/services');
const industryRoutes = require('./routes/industries');
const categoryRoutes = require('./routes/categories');
const mediaRoutes = require('./routes/media');
const userRoutes = require('./routes/users');
const companyRoutes = require('./routes/company');
const teamRoutes = require('./routes/team');
const locationsRoutes = require('./routes/locations');
const contactRoutes = require('./routes/contact');
const seoRoutes = require('./routes/seo');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://unpkg.com"],
      fontSrc: ["'self'", "https:", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "http://localhost:3001"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow same-origin requests
    if (origin === 'http://localhost:3001') return callback(null, true);
    
    // Allow configured origins
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
}));

// Middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (uploaded media)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Serve admin interface
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));

// Welcome page
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'South Pole CMS Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      admin: '/admin',
      api_docs: '/api',
    },
    admin_access: {
      login: '/admin/login',
      dashboard: '/admin/dashboard'
    }
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  let databaseStatus = false;
  
  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseStatus = true;
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: databaseStatus
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/seo', seoRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 CMS Backend API running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;