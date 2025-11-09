#!/bin/bash

echo "🚀 Starting Debt Optimizer - Development Mode"
echo ""
echo "This will start both servers with hot reloading:"
echo "  - Frontend (Vite): http://localhost:3000"
echo "  - Backend (Nodemon): http://localhost:5000"
echo ""

# Check if dependencies are installed
if [ ! -d "client/node_modules" ] || [ ! -d "server/node_modules" ]; then
    echo "❌ Dependencies not installed!"
    echo ""
    echo "Please run:"
    echo "  npm install"
    echo "  cd client && npm install"
    echo "  cd ../server && npm install"
    exit 1
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env not found"
    echo "   Copy from server/.env.example and configure"
    echo ""
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Warning: client/.env not found"
    echo "   Copy from client/.env.example and configure"
    echo ""
fi

echo "✅ Starting servers..."
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Run both servers concurrently
npm run dev
