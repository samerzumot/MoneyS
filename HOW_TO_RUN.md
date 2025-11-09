# 🚀 How to Run with Hot Reloading

## Quick Start (Auto Hot Reload)

### Option 1: Using the Convenience Script (Recommended)
```bash
./run-dev.sh
```
This automatically starts both frontend and backend with hot reloading!

### Option 2: Using npm
```bash
npm run dev
```

### Option 3: Manual (Separate Terminals)

**Terminal 1 - Backend (with Nodemon):**
```bash
cd server
npm run dev
```
✅ Hot reloading enabled via Nodemon
✅ Watches all `.js` files
✅ Auto-restarts on changes

**Terminal 2 - Frontend (with Vite HMR):**
```bash
cd client
npm start
```
✅ Hot Module Replacement (HMR) enabled
✅ Instant updates in browser
✅ Preserves component state

---

## What You Get

### Frontend Hot Reloading (Vite HMR)
- ⚡ **Instant updates** - Changes appear immediately
- 🔥 **Component state preserved** - No page refresh needed
- 🎨 **CSS hot reload** - Style changes apply instantly
- 📦 **Fast builds** - Optimized with esbuild

### Backend Hot Reloading (Nodemon)
- 🔄 **Auto-restart** - Server restarts on file changes
- 👀 **File watching** - Monitors all server files
- 🚀 **Quick iterations** - No manual restarts needed
- 📝 **Error handling** - Shows errors in console

---

## Access Points

Once running, access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

---

## First Time Setup

Before running, ensure you have:

### 1. Dependencies Installed
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Environment Variables Configured
```bash
# Copy example files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit the files with your credentials:
# - Firebase config
# - Plaid credentials
# - Database URL
```

### 3. Database Created
```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE debt_optimizer;"
```

### 4. Database Migrated (Optional)
```bash
cd server
npm run migrate
```

---

## Development Workflow

### Making Changes

**Frontend Changes** (React Components):
1. Edit files in `client/src/`
2. Save the file
3. ✅ Browser updates instantly (no refresh!)

**Backend Changes** (API/Services):
1. Edit files in `server/src/`
2. Save the file
3. ✅ Server restarts automatically
4. Refresh browser if needed for new API changes

**Styles** (Tailwind CSS):
1. Edit `className` attributes in components
2. Save the file
3. ✅ Styles update instantly

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change ports in .env files
```

### Hot Reload Not Working

**Frontend:**
- Check console for Vite errors
- Try `rm -rf client/node_modules/.vite` and restart
- Ensure you're editing files inside `client/src/`

**Backend:**
- Check if nodemon is watching correct files
- Look for syntax errors in console
- Restart server manually: `cd server && npm run dev`

### Changes Not Appearing
1. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Check if file was actually saved
3. Check console for errors
4. Restart development servers

---

## Advanced Options

### Run Only Frontend
```bash
cd client
npm run dev
```

### Run Only Backend
```bash
cd server
npm run dev
```

### Production Build (No Hot Reload)
```bash
# Build frontend
cd client
npm run build

# Run backend in production mode
cd ../server
NODE_ENV=production npm start
```

### Docker with Hot Reload
```bash
# Add volume mounts in docker-compose.yml for hot reload
docker-compose up
```

---

## IDE Integration

### VS Code
1. Install **ES7+ React/Redux/React-Native snippets**
2. Install **Tailwind CSS IntelliSense**
3. Enable auto-save: File → Auto Save

### Recommended Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense

---

## Performance Tips

### Faster Hot Reload
- Close unused files/tabs
- Disable browser extensions during development
- Use `.env` instead of hardcoded values
- Keep console open to spot errors quickly

### Optimize Vite
Already configured for fast HMR in `vite.config.js`:
```javascript
server: {
  port: 3000,
  hmr: true,  // Hot Module Replacement
}
```

### Optimize Nodemon
Already configured in `server/package.json`:
```json
"dev": "nodemon src/server.js"
```

---

## What Gets Reloaded

### Automatically Reloaded ✅
- React components (`.jsx`, `.js`)
- CSS/Tailwind styles
- API routes and controllers
- Services and utilities
- Database models (after restart)

### Requires Manual Restart ⚠️
- Environment variables (`.env` files)
- Package.json dependencies
- Configuration files (`vite.config.js`, etc.)
- Database schema changes

---

## Keyboard Shortcuts

While servers are running:
- `Ctrl + C` - Stop servers
- `R` + `Enter` - Restart backend (in nodemon)
- Browser `Cmd/Ctrl + R` - Refresh page

---

## Quick Commands Reference

```bash
# Start everything with hot reload
npm run dev

# Verify setup
./verify-setup.sh

# Check if servers are running
curl http://localhost:5000/health

# View logs
cd server && npm run dev  # Watch backend logs
# Browser console - Watch frontend logs
```

---

## 🎉 You're Ready!

Just run:
```bash
./run-dev.sh
```

And start coding! Changes will automatically reload. 🔥

---

**Happy coding with hot reload! ⚡**
