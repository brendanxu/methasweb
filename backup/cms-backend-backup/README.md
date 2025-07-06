# South Pole CMS Backend

A RESTful API backend for the South Pole content management system.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secrets
   ```

3. **Set up database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Seed database with sample data
   npm run seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 📚 API Documentation

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Case Studies
- `GET /api/case-studies` - List case studies
- `GET /api/case-studies/:id` - Get case study
- `POST /api/case-studies` - Create case study
- `PUT /api/case-studies/:id` - Update case study
- `DELETE /api/case-studies/:id` - Delete case study

### News Articles
- `GET /api/news-articles` - List news articles
- `GET /api/news-articles/:id` - Get news article
- `POST /api/news-articles` - Create news article
- `PUT /api/news-articles/:id` - Update news article
- `DELETE /api/news-articles/:id` - Delete news article

### Media Management
- `GET /api/media` - List media files
- `POST /api/media/upload` - Upload media file
- `PUT /api/media/:id` - Update media info
- `DELETE /api/media/:id` - Delete media file

### Taxonomy
- `GET /api/services` - List services
- `GET /api/industries` - List industries
- `GET /api/categories` - List categories

## 🗄️ Database Schema

The database uses PostgreSQL with Prisma ORM. Key entities:

- **Users** - System users with roles (Admin, Editor, Viewer)
- **CaseStudy** - Client case studies with services and industry
- **NewsArticle** - News articles with categories
- **Service** - Service classifications for case studies
- **Industry** - Industry classifications
- **Category** - News article categories
- **MediaFile** - Uploaded images and documents

## 🛠️ Development

### Database Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with sample data
npm run seed
```

### Environment Variables

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token signing
- `CLOUDINARY_*` - Cloudinary credentials for image uploads
- `PORT` - Server port (default: 3001)

## 📁 Project Structure

```
src/
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # Helper functions
└── app.js          # Express app setup

prisma/
├── schema.prisma   # Database schema
├── migrations/     # Database migrations
└── seed.js        # Database seeding
```

## 🔐 Authentication & Authorization

The API uses JWT tokens for authentication and role-based access control:

- **Admin** - Full system access
- **Editor** - Create, edit, and publish content
- **Viewer** - Read-only access

## 🚢 Deployment

The API is designed to be deployed on:

- Railway (recommended)
- Vercel
- DigitalOcean App Platform
- Any Node.js hosting service

Make sure to set all environment variables in your hosting platform.

## 📊 Monitoring

- Health check endpoint: `/health`
- Request logging with Morgan
- Error tracking and handling
- Rate limiting for API protection

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

## 📄 License

MIT License