#!/bin/bash

# South Pole Website Deployment Script
# This script handles production deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="southpole-website"
DEPLOY_ENV=${1:-production}
BRANCH=${2:-main}

echo -e "${BLUE}🚀 Starting deployment for ${APP_NAME} - Environment: ${DEPLOY_ENV}${NC}"

# Check if environment file exists
if [ ! -f ".env.${DEPLOY_ENV}" ]; then
    echo -e "${RED}❌ Environment file .env.${DEPLOY_ENV} not found${NC}"
    exit 1
fi

# Load environment variables
source .env.${DEPLOY_ENV}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
echo -e "${YELLOW}🔍 Checking required tools...${NC}"

if ! command_exists docker; then
    echo -e "${RED}❌ Docker not found. Please install Docker.${NC}"
    exit 1
fi

if ! command_exists docker-compose; then
    echo -e "${RED}❌ Docker Compose not found. Please install Docker Compose.${NC}"
    exit 1
fi

if ! command_exists git; then
    echo -e "${RED}❌ Git not found. Please install Git.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All required tools found${NC}"

# Git operations
echo -e "${YELLOW}📦 Updating code from repository...${NC}"

# Stash any local changes
git stash

# Fetch latest changes
git fetch origin

# Checkout target branch
git checkout ${BRANCH}

# Pull latest changes
git pull origin ${BRANCH}

echo -e "${GREEN}✅ Code updated successfully${NC}"

# Environment-specific operations
case ${DEPLOY_ENV} in
    "production")
        COMPOSE_FILE="docker-compose.prod.yml"
        echo -e "${YELLOW}🏭 Deploying to production environment${NC}"
        ;;
    "staging")
        COMPOSE_FILE="docker-compose.staging.yml"
        echo -e "${YELLOW}🧪 Deploying to staging environment${NC}"
        ;;
    *)
        echo -e "${RED}❌ Unknown environment: ${DEPLOY_ENV}${NC}"
        exit 1
        ;;
esac

# Create backup before deployment
echo -e "${YELLOW}💾 Creating database backup...${NC}"
mkdir -p ./backups
BACKUP_FILE="./backups/backup_$(date +%Y%m%d_%H%M%S).sql"

if [ "${DEPLOY_ENV}" = "production" ]; then
    docker-compose -f ${COMPOSE_FILE} exec -T postgres pg_dump -U ${POSTGRES_USER} ${POSTGRES_DB} > ${BACKUP_FILE}
    echo -e "${GREEN}✅ Database backup created: ${BACKUP_FILE}${NC}"
fi

# Build and deploy
echo -e "${YELLOW}🔨 Building application...${NC}"

# Stop existing containers
docker-compose -f ${COMPOSE_FILE} down

# Pull latest images
docker-compose -f ${COMPOSE_FILE} pull

# Build new images
docker-compose -f ${COMPOSE_FILE} build --no-cache

echo -e "${GREEN}✅ Application built successfully${NC}"

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"

docker-compose -f ${COMPOSE_FILE} up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 30

# Health checks
echo -e "${YELLOW}🏥 Running health checks...${NC}"

# Check main site
if curl -f -s http://localhost:3000/api/health >/dev/null; then
    echo -e "${GREEN}✅ Main site is healthy${NC}"
else
    echo -e "${RED}❌ Main site health check failed${NC}"
    docker-compose -f ${COMPOSE_FILE} logs main-site
    exit 1
fi

# Check API
if curl -f -s http://localhost:3001/api/health >/dev/null; then
    echo -e "${GREEN}✅ API is healthy${NC}"
else
    echo -e "${RED}❌ API health check failed${NC}"
    docker-compose -f ${COMPOSE_FILE} logs api
    exit 1
fi

# Database migrations (if needed)
echo -e "${YELLOW}🗄️ Running database migrations...${NC}"
docker-compose -f ${COMPOSE_FILE} exec api npm run db:migrate

echo -e "${GREEN}✅ Database migrations completed${NC}"

# Clean up old Docker images
echo -e "${YELLOW}🧹 Cleaning up old Docker images...${NC}"
docker image prune -f

echo -e "${GREEN}✅ Cleanup completed${NC}"

# Final status
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}📊 Service Status:${NC}"
docker-compose -f ${COMPOSE_FILE} ps

echo -e "${BLUE}🔗 Access URLs:${NC}"
echo -e "Main Site: https://${MAIN_DOMAIN:-localhost:3000}"
echo -e "API: https://${API_DOMAIN:-localhost:3001}"

if [ "${DEPLOY_ENV}" = "production" ]; then
    echo -e "${BLUE}📈 Monitoring:${NC}"
    echo -e "Grafana: http://localhost:3001"
    echo -e "Prometheus: http://localhost:9090"
fi

echo -e "${GREEN}🚀 Deployment completed successfully at $(date)${NC}"