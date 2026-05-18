# QUICK START GUIDE

## Windows Setup (5 minutes)

### Option 1: Automated Setup (Recommended)

**PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup.ps1
```

**Or CMD/Batch:**
```batch
setup.bat
```

### Option 2: Manual Setup

**Step 1: Backend Setup**
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Expected output:
```
✅ Server running on http://localhost:3001
📡 WebSocket ready for connections
```

**Step 2: Frontend Setup (New Terminal)**
```bash
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

Expected output:
```
Ready in X.Xs
Local:        http://localhost:3000
```

## 🚀 Using the App

1. Open browser: **http://localhost:3000**
2. Click **Admin** in navbar
3. Add a feed:
   - Title: "First Feed"
   - Message: "Welcome to realtime coaching!"
   - Click "Create Feed"
4. Back to **Home** - feed appears instantly! ✨

## 🔧 Configuration

### Environment Variables

**Backend** (`backend/.env`):
- `PORT=3001` - Server port
- `REDIS_URL=redis://localhost:6379` - Redis connection
- `DB_PATH=./data/feeds.db` - Database location

**Frontend** (`frontend/.env.local`):
- `NEXT_PUBLIC_API_URL=http://localhost:3001` - Backend URL
- `NEXT_PUBLIC_SOCKET_URL=http://localhost:3001` - WebSocket URL

## 📊 Testing API Directly

```bash
# Get all feeds
curl http://localhost:3001/feed

# Create new feed
curl -X POST http://localhost:3001/feed \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","message":"Testing API"}'

# Health check
curl http://localhost:3001/health
```

## 🎯 Verification Checklist

✅ Backend running on http://localhost:3001
✅ Frontend running on http://localhost:3000
✅ WebSocket connection shows "Live" status
✅ Can add feed from /admin page
✅ Home page updates realtime
✅ Feeds appear without page refresh

## ❌ Troubleshooting

**Port already in use?**
```bash
# Windows - find process using port
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <PID> /F
```

**npm install fails?**
```bash
npm cache clean --force
npm install
```

**Cannot connect to Redis?**
That's okay! Redis is optional. Backend logs a warning but continues to work.

**Want Redis caching?**
```bash
# Windows WSL
wsl
sudo service redis-server start

# Or using Docker
docker run -d -p 6379:6379 redis:latest
```

## 📚 Project Structure

```
├── backend/          # Express + Socket.IO server
│   ├── src/
│   │   ├── models/   # Data models
│   │   ├── dao/      # Database access
│   │   ├── services/ # Business logic
│   │   ├── controllers/ # HTTP handlers
│   │   └── ...
│   └── package.json
│
├── frontend/         # Next.js + React app
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   ├── admin/page.tsx # Admin page
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # React hooks
│   │   └── ...
│   └── package.json
│
└── README.md        # Full documentation
```

## 🏗️ Architecture Overview

**Backend**: Model → DAO → Service → Controller → Routes
- Layered architecture for maintainability
- DAO: Database queries only
- Service: Business logic & caching
- Controller: HTTP request handling

**Frontend**: React hooks for state management
- `useSocket()`: Connection lifecycle
- `useFeed()`: Feed state + realtime updates
- Components: Reusable UI elements

**Realtime Flow**:
1. Admin submits form → POST /feed
2. Backend creates feed → Database insert + Redis invalidation
3. Socket.IO emits `feed:new` event
4. Frontend receives → UI updates instantly
5. All connected clients see update simultaneously

## 🔒 Security Notes

- No authentication on /admin (add before production)
- CORS: Open to all (`*`) - restrict in production
- Inputs validated on both backend and frontend
- SQL injection: Parameterized queries only

## 📈 Performance

- Redis caches feeds (60s TTL)
- WebSocket instead of polling (efficient)
- Auto-reconnection with exponential backoff
- Proper cleanup of Socket listeners (no memory leaks)

## 🚀 Production Steps

1. Change `NODE_ENV=production`
2. Set proper `CORS_ORIGIN` (not `*`)
3. Use managed database (PostgreSQL)
4. Use managed cache (Redis cluster)
5. Add authentication to /admin
6. Enable HTTPS
7. Set up monitoring/logging
8. Configure auto-scaling

---

**Need help?** Check [README.md](./README.md) for detailed documentation.
