# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Backend (.NET)
```bash
# Build entire solution
dotnet build umbraco.sln

# Run all tests
dotnet test umbraco.sln

# Run specific test project
dotnet test tests/Umbraco.Tests.UnitTests/Umbraco.Tests.UnitTests.csproj
```

### Frontend (Backoffice UI)
```bash
# Navigate to frontend directory first
cd src/Umbraco.Web.UI.Client

# Install dependencies
npm ci

# Development
npm run dev           # Start dev server
npm run dev:server    # Dev server without mock
npm run dev:mock      # Dev server with MSW mocks

# Build
npm run build         # Build TypeScript
npm run build:for:cms # Build and copy to CMS

# Code quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run format:fix    # Fix formatting with Prettier

# Testing
npm run test          # Run web component tests
npm run test:watch    # Run tests in watch mode
npm run test:e2e      # Run Playwright E2E tests
```

## Architecture Overview

### Solution Structure
- **Umbraco.Core** - Core abstractions and domain models
- **Umbraco.Infrastructure** - Infrastructure implementations (caching, events, mapping)
- **Umbraco.Web.UI** - Main web application host
- **Umbraco.Web.UI.Client** - TypeScript/Lit-based backoffice (located in `src/`)
- **Umbraco.Cms.Api.Management** - Backoffice API endpoints
- **Umbraco.Cms.Api.Delivery** - Content Delivery API
- **Umbraco.Cms.Persistence.*** - Data access layer with EF Core

### Frontend Architecture
The backoffice (`src/Umbraco.Web.UI.Client`) uses:
- Lit Web Components with TypeScript
- Modular package structure under `src/packages/`
- Context API for state management
- Vite for bundling
- MSW for API mocking during development

### Key Technologies
- Backend: .NET 9.0, C# with nullable reference types
- Frontend: TypeScript, Lit, Vite
- Database: SQL Server or SQLite via EF Core
- Search: Lucene.NET via Examine
- Testing: xUnit (backend), Playwright (E2E), Web Test Runner (frontend)

## Development Guidelines

### Working with the Frontend
- All frontend code is in `src/Umbraco.Web.UI.Client/`
- Use export maps defined in package.json for clean imports
- Follow the established Web Component patterns using Lit
- Custom ESLint rules enforce Umbraco-specific import patterns

### API Development
- Management API uses OpenAPI/Swagger
- API endpoints are organized by feature in `Umbraco.Cms.Api.Management`
- Follow existing controller patterns and use proper authorization attributes

### Testing
- Unit tests use xUnit and follow naming convention: `ClassUnderTest_MethodName_ExpectedBehavior`
- Integration tests are in `Umbraco.Tests.Integration`
- E2E tests use Playwright and are in `tests/Umbraco.Tests.AcceptanceTest`

### Version Information
- Current version: 16.0.0
- Using Nerdbank.GitVersioning for version management
- Target framework: .NET 9.0