# Claude AI Development Guide for South Pole Clone

## Project Overview

This is a high-fidelity clone of the South Pole climate solutions website, built with modern web technologies. The project is production-ready and focuses on showcasing climate solutions with elegant design and smooth animations.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.1
- **Animation**: Framer Motion 11
- **Build Tool**: Turborepo (Monorepo management)
- **Package Manager**: npm 10.9.2
- **Deployment**: Vercel / Tencent EdgeOne

## Project Architecture

### Monorepo Structure (Turborepo)

```
southpole-clone/
├── apps/
│   └── main-site/          # Main Next.js application
│       ├── app/            # App Router pages
│       ├── lib/            # Utilities, types, and mock data
│       └── public/         # Static assets
├── packages/
│   ├── ui/                 # Shared React component library
│   ├── tailwind-config/    # Shared Tailwind configuration
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── prettier-config/    # Shared Prettier configuration
│   └── typescript-config/  # Shared TypeScript configuration
└── turbo.json             # Turborepo configuration
```

### Key Design Patterns

1. **Component-Based Architecture**: Reusable UI components in `@repo/ui` package
2. **Type Safety**: Full TypeScript coverage with shared types
3. **Configuration Sharing**: Centralized configs for consistency
4. **Mock Data Pattern**: Simulated CMS data in `lib/mock-data.ts`

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3001)
npm run dev

# Build all packages
npm run build

# Run linting
npm run lint

# Type checking
npm run check-types

# Format code
npm run format
```

## Key Components and Features

### UI Components (`packages/ui/src/`)
- **Button**: Multi-variant button with hover animations
- **Card**: Content card with image and hover effects
- **Header**: Responsive navigation with mega menu
- **Footer**: Multi-column footer layout
- **MotionSection/MotionGrid**: Scroll-triggered animations

### Page Routes
- `/` - Homepage with hero, services, case studies, and news
- `/work` - Case studies listing
- `/work/[slug]` - Case study details
- `/news` - News articles listing
- `/news/[slug]` - News article details

### Data Types (`apps/main-site/lib/types.ts`)
- CaseStudy
- NewsArticle
- Service
- Report
- Project
- Industry
- Category

## Styling Guidelines

### Tailwind Configuration
```javascript
// Color palette
primary: '#0057FF'    // Blue
secondary: '#00B5A1'  // Teal
dark: '#0F172A'       // Dark gray
light: '#F8FAFC'      // Light gray
gray: '#64748B'       // Medium gray
```

### Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Animation Strategy

Using Framer Motion for:
- Scroll-triggered entrance animations
- Hover states and interactions
- Page transitions
- Header scroll effects
- Mobile menu animations

## Current State and Known Issues

### Completed Features ✅
- All core pages implemented
- Responsive design complete
- Animation system working
- Mock data integration
- SEO optimization

### Placeholder Features 🔄
- Category/industry filtering (UI complete, logic pending)
- Search functionality
- Share functionality
- Real CMS integration

### Configuration Notes
- TypeScript and ESLint errors are ignored during build (see `next.config.ts`)
- Framer Motion may show @emotion/is-prop-valid warnings (harmless)

## Development Best Practices

1. **Component Development**: Add new components to `packages/ui/src/`
2. **Type Safety**: Define interfaces in `lib/types.ts`
3. **Mock Data**: Update `lib/mock-data.ts` for testing
4. **Animations**: Use `MotionSection` wrapper for scroll animations
5. **Images**: Use Next.js Image component for optimization

## Deployment

### Vercel Deployment
```bash
vercel --prod
```

### Build Configuration
- Build command: `cd apps/main-site && npm run build`
- Output directory: `apps/main-site/.next`
- Install command: `npm install`

## Working with the Codebase

### Adding a New Page
1. Create file in `apps/main-site/app/[route]/page.tsx`
2. Import necessary UI components from `@repo/ui`
3. Add types to `lib/types.ts` if needed
4. Update mock data if required

### Creating a New Component
1. Add component to `packages/ui/src/[component].tsx`
2. Export from `packages/ui/src/index.tsx`
3. Build UI package: `cd packages/ui && npm run build`
4. Import in app: `import { Component } from '@repo/ui'`

### Modifying Styles
1. Global styles: `apps/main-site/app/globals.css`
2. Component styles: Use Tailwind classes
3. Theme changes: Update `packages/tailwind-config/tailwind.config.js`

## Quick Tips

- Development server runs on port 3001 (not 3000)
- UI components must be built before use in apps
- Use absolute imports with `@/` prefix in main-site app
- All images use Unsplash for consistency
- Keep animations performant on mobile devices

## Additional Resources

- **Testing Report**: See `TESTING-REPORT.md` for detailed feature testing
- **Deployment Guide**: See `README-DEPLOYMENT.md` for deployment instructions
- **Project Overview**: See `PROJECT-README.md` for project details in Chinese