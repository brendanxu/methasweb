#!/bin/bash

echo "🔧 South Pole CMS - Database Setup Script"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is designed for macOS. For other systems, please install PostgreSQL manually."
    exit 1
fi

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    print_warning "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ -f "/opt/homebrew/bin/brew" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    print_success "Homebrew is already installed"
fi

# Install PostgreSQL
if ! command -v psql &> /dev/null; then
    print_warning "Installing PostgreSQL..."
    brew install postgresql@16
    brew services start postgresql@16
    
    # Add PostgreSQL to PATH
    echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
    export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
    
    print_success "PostgreSQL installed successfully"
else
    print_success "PostgreSQL is already installed"
    # Ensure PostgreSQL service is running
    brew services start postgresql@16 2>/dev/null || true
fi

# Wait for PostgreSQL to start
sleep 3

# Create database and user
print_warning "Setting up South Pole CMS database..."

# Create database user
psql postgres -c "CREATE USER southpole_user WITH PASSWORD 'southpole_dev_2024';" 2>/dev/null || print_warning "User might already exist"

# Create database
psql postgres -c "CREATE DATABASE southpole_cms OWNER southpole_user;" 2>/dev/null || print_warning "Database might already exist"

# Grant privileges
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE southpole_cms TO southpole_user;" 2>/dev/null

print_success "Database setup complete!"

# Update .env file
ENV_FILE="apps/cms-backend/.env"
if [ -f "$ENV_FILE" ]; then
    print_warning "Updating .env file with database connection..."
    
    # Backup existing .env
    cp "$ENV_FILE" "$ENV_FILE.backup"
    
    # Update DATABASE_URL
    sed -i '' 's|DATABASE_URL=.*|DATABASE_URL="postgresql://southpole_user:southpole_dev_2024@localhost:5432/southpole_cms?schema=public"|' "$ENV_FILE"
    
    print_success ".env file updated"
else
    print_error ".env file not found. Creating from .env.example..."
    cp "apps/cms-backend/.env.example" "$ENV_FILE"
    sed -i '' 's|DATABASE_URL=.*|DATABASE_URL="postgresql://southpole_user:southpole_dev_2024@localhost:5432/southpole_cms?schema=public"|' "$ENV_FILE"
    print_success ".env file created"
fi

echo ""
echo "📋 Database Connection Details:"
echo "================================"
echo "Database: southpole_cms"
echo "User: southpole_user"
echo "Password: southpole_dev_2024"
echo "Host: localhost"
echo "Port: 5432"
echo ""
echo "🚀 Next Steps:"
echo "1. cd apps/cms-backend"
echo "2. npm run db:generate"
echo "3. npm run db:push"
echo "4. npm run seed"
echo "5. npm run dev"
echo ""
print_success "Database setup complete! You can now run the CMS backend."