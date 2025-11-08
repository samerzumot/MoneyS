#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Verifying Debt Optimizer Setup..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version)
    echo -e "${GREEN}✓${NC} PostgreSQL installed: $PSQL_VERSION"
else
    echo -e "${YELLOW}⚠${NC} PostgreSQL not found. You'll need this for the database."
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} Git installed: $GIT_VERSION"
else
    echo -e "${RED}✗${NC} Git not found"
fi

echo ""
echo "📁 Checking project structure..."

# Check directories
if [ -d "client" ]; then
    echo -e "${GREEN}✓${NC} Client directory exists"
else
    echo -e "${RED}✗${NC} Client directory missing"
fi

if [ -d "server" ]; then
    echo -e "${GREEN}✓${NC} Server directory exists"
else
    echo -e "${RED}✗${NC} Server directory missing"
fi

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Root dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Root dependencies not installed. Run: npm install"
fi

if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Client dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Client dependencies not installed. Run: cd client && npm install"
fi

if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Server dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Server dependencies not installed. Run: cd server && npm install"
fi

# Check environment files
echo ""
echo "🔐 Checking environment configuration..."

if [ -f "server/.env" ]; then
    echo -e "${GREEN}✓${NC} Server .env file exists"
else
    echo -e "${YELLOW}⚠${NC} Server .env file missing. Copy from server/.env.example"
fi

if [ -f "client/.env" ]; then
    echo -e "${GREEN}✓${NC} Client .env file exists"
else
    echo -e "${YELLOW}⚠${NC} Client .env file missing. Copy from client/.env.example"
fi

# Check key files
echo ""
echo "📄 Checking key files..."

FILES=(
    "README.md"
    "QUICK_START.md"
    "PROJECT_SUMMARY.md"
    "package.json"
    "docker-compose.yml"
    "client/package.json"
    "client/vite.config.js"
    "client/tailwind.config.js"
    "client/src/App.jsx"
    "client/src/pages/Dashboard.jsx"
    "server/package.json"
    "server/src/server.js"
    "server/src/config/database.js"
    "server/src/models/index.js"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done

echo ""
echo "✨ Verification complete!"
echo ""
echo "📚 Next steps:"
echo "1. Install dependencies: npm install && cd client && npm install && cd ../server && npm install"
echo "2. Set up environment: Copy .env.example to .env in client/ and server/"
echo "3. Configure database: Create PostgreSQL database"
echo "4. Start development: npm run dev"
echo ""
echo "📖 Read QUICK_START.md for detailed setup instructions"
