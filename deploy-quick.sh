#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║          🚀 QUICK DEPLOYMENT - DEBT OPTIMIZER 🚀            ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "This script will help you deploy to Vercel (fastest option)"
echo ""

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo -e "${RED}❌ Error: Must run from project root${NC}"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installing client dependencies...${NC}"
    cd client && npm install && cd ..
fi

# Build the frontend
echo ""
echo -e "${BLUE}📦 Building frontend...${NC}"
cd client
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Check for errors above.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
cd ..

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo -e "${YELLOW}📥 Installing Vercel CLI...${NC}"
    npm i -g vercel
fi

# Deploy to Vercel
echo ""
echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
echo ""
echo "You'll need to:"
echo "  1. Login to Vercel (browser will open)"
echo "  2. Select your project settings"
echo "  3. Confirm deployment"
echo ""
read -p "Press Enter to continue..."

cd client
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}║                  🎉 DEPLOYMENT SUCCESSFUL! 🎉                ║${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}✅ Your demo is live!${NC}"
    echo ""
    echo "The URL was shown above. You can also find it at:"
    echo "  → https://vercel.com/dashboard"
    echo ""
    echo -e "${YELLOW}⚠️  Note: This is frontend-only deployment${NC}"
    echo "The app will work with mock data on the dashboard."
    echo ""
    echo "To deploy the backend:"
    echo "  1. Go to https://railway.app/"
    echo "  2. Deploy the 'server' folder"
    echo "  3. Add environment variables"
    echo "  4. Update VITE_API_URL in Vercel settings"
    echo ""
    echo "See DEPLOY.md for detailed backend deployment instructions."
    echo ""
else
    echo -e "${RED}❌ Deployment failed${NC}"
    echo "Please check the error messages above"
    exit 1
fi

cd ..
