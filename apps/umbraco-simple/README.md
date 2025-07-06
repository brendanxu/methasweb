# South Pole Umbraco CMS - Railway Deployment

## Overview

This is a simplified Umbraco CMS instance configured for Railway deployment. It serves as the headless CMS backend for the South Pole climate solutions website.

## Railway Deployment

### Prerequisites

1. Railway CLI installed
2. Railway account connected
3. Git repository initialized

### Deployment Steps

1. **Initialize Railway project**
   ```bash
   railway login
   railway init
   ```

2. **Deploy to Railway**
   ```bash
   railway up
   ```

3. **Set environment variables (optional)**
   ```bash
   railway variables set ASPNETCORE_ENVIRONMENT=Production
   ```

### Configuration Files

- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Build configuration
- `Dockerfile` - Container configuration
- `appsettings.Production.json` - Production settings

## Local Development

```bash
dotnet run
```

Access Umbraco at `http://localhost:5001/umbraco`

## Default Credentials

- **Username**: admin@southpole.com
- **Password**: SouthPole2024!Railway

## API Access

- **Delivery API**: Enabled
- **API Key**: southpole-railway-api-key-2024
- **Public Access**: Enabled

## Database

- **Local**: SQLite database in `/app/data/`
- **Production**: SQLite persisted in Railway volume

## Features

- Unattended installation
- Delivery API enabled
- Security configured for production
- HTTPS enforcement
- Content versioning enabled