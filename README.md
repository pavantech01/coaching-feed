# Realtime Coaching Feed App

A production-ready realtime coaching feed application built with Next.js, Express, Socket.IO, SQLite, and Redis.

## Features

✅ **Realtime Updates** - Socket.IO for instant feed broadcasting
✅ **Scalable Architecture** - Clean model→DAO→service→controller→routes pattern
✅ **Caching Layer** - Redis caching with automatic invalidation
✅ **TypeScript** - Fully typed frontend and backend
✅ **Responsive UI** - Tailwind CSS with mobile support
✅ **Error Handling** - Comprehensive validation and error states
✅ **Production Ready** - Environment-based config, logging, graceful shutdown

## Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **Socket.IO** - Realtime WebSocket communication
- **SQLite** - Lightweight persistent database
- **Redis** - Cache layer for GET endpoints
- **TypeScript** - Type-safe code
- **Dotenv** - Environment configuration

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe React components
- **Tailwind CSS** - Utility-first styling
- **Socket.IO Client** - Realtime updates
- **React Hooks** - State management

## Project Structure

```
coaching-feed-app/
├── backend/
│   ├── src/
│   │   ├── models/          # Data models & validation
│   │   ├── dao/             # Database access layer
│   │   ├── services/        # Business logic & caching
│   │   ├── controllers/     # HTTP handlers
│   │   ├── routes/          # API endpoints
│   │   ├── config/          # Database, Redis, Socket.IO setup
│   │   ├── middleware/      # Error handling, validation
│   │   ├── utils/           # Loggers, validators
│   │   ├── types/           # TypeScript interfaces
│   │   └── index.ts         # Server entry point
│   ├── data/                # SQLite database (generated)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Home - View feeds (realtime)
│   │   ├── admin/page.tsx   # Admin - Add feeds
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/           # useSocket, useFeed
│   │   ├── services/        # API & Socket.IO client
│   │   ├── utils/           # Constants, helpers
│   │   ├── styles/          # Global CSS
│   │   └── layout.tsx       # Root layout with nav
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── next.config.ts
│   ├── .env.example
│   └── .gitignore
│
├── README.md
├── sample.env
└── .gitignore
```

## API Endpoints

### GET /feed
Retrieve all feeds (cached)
```bash
curl http://localhost:3001/feed
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Morning Workout Tip",
      "message": "Start your day with 10 minutes of stretching...",
      "created_at": "2024-05-18T09:30:00.000Z"
    }
  ]
}
```

### POST /feed
Create a new feed (broadcasts via Socket.IO)
```bash
curl -X POST http://localhost:3001/feed \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hydration Reminder",
    "message": "Drink 8 glasses of water daily for optimal performance"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Hydration Reminder",
    "message": "Drink 8 glasses of water daily...",
    "created_at": "2024-05-18T10:15:00.000Z"
  },
  "message": "Feed created successfully"
}
```

## Windows Setup Instructions

### Prerequisites
- **Node.js** (v18+ recommended) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Redis** (optional for caching)
  - [Redis for Windows](https://github.com/microsoftarchive/redis/releases)
  - Or use Windows Subsystem for Linux (WSL): `wsl` → `sudo apt-get install redis-server`

### Step 1: Clone & Navigate
```bash
cd d:\A_Pavan_Self\Projects
git clone <your-repo-url> coaching-feed-app
cd coaching-feed-app
```

### Step 2: Backend Setup

```bash
cd backend

# Copy environment file
copy .env.example .env

# Edit .env if needed (or use defaults)
# PORT=3001
# NODE_ENV=development
# REDIS_URL=redis://localhost:6379

# Install dependencies
npm install

# Start backend (dev mode)
npm run dev
```

Expected output:
```
✅ Server running on http://localhost:3001
📡 WebSocket ready for connections
🌍 Environment: development
```

### Step 3: Frontend Setup (New Terminal/PowerShell)

```bash
cd frontend

# Copy environment file
copy .env.example .env.local

# Edit .env.local if needed (or use defaults)
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Install dependencies
npm install

# Start frontend (dev mode)
npm run dev
```

Expected output:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### Step 4: Test the Application

1. **Open browser**: http://localhost:3000
2. **Home page**: Should show "No feeds yet" message
3. **Navigate to Admin**: http://localhost:3000/admin
4. **Add a feed**:
   - Title: "Welcome to Coaching"
   - Message: "This is your first coaching feed!"
   - Click "Create Feed"
5. **Verify realtime update**: Go back to Home page - feed appears instantly (Socket.IO)
6. **Connection status**: Check for green "Live" indicator in top right

### Step 5: Optional - Redis Setup for Caching

#### On Windows (using Docker or WSL)

**Option A: Using WSL**
```bash
# In WSL terminal
wsl
sudo service redis-server start
redis-cli ping  # Should respond with PONG
```

**Option B: Using Docker**
```bash
docker run -d -p 6379:6379 redis:latest
```

**Option C: Download Windows Version**
- Download from: https://github.com/microsoftarchive/redis/releases
- Extract and run `redis-server.exe`

Once Redis is running:
- Backend automatically connects and logs: "Redis connected at redis://localhost:6379"
- Feeds are cached for 60 seconds (configurable via `CACHE_TTL` in .env)
- Cache invalidated when new feeds are created

## Development Workflow

### Starting Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start  # Runs compiled dist/index.js
```

**Frontend:**
```bash
cd frontend
npm run build
npm start  # Runs Next.js production server
```

## Architecture Details

### Backend Pattern: Model → DAO → Service → Controller → Routes

1. **Model** (`Feed.ts`)
   - Data structure and validation
   - DTO validation logic

2. **DAO** (`FeedDAO.ts`)
   - Database access only
   - Pure SQL queries
   - No business logic

3. **Service** (`FeedService.ts`)
   - Business logic
   - Cache management
   - Input validation
   - Error handling

4. **Controller** (`FeedController.ts`)
   - HTTP request/response handling
   - Status codes and error formatting

5. **Routes** (`feedRoutes.ts`)
   - Endpoint definitions
   - Middleware pipeline

### Frontend Hooks

**`useSocket()`**
- Manages Socket.IO connection lifecycle
- Prevents duplicate listeners (tracks listener count)
- Provides subscription function for events
- Handles connection/error states

**`useFeed()`**
- Combines `useSocket()` for realtime updates
- Manages feed state (array of feeds)
- Subscribes to `feed:new` events for instant updates
- Provides `createFeed()` method

### Realtime Flow

1. **Admin submits feed** → Frontend POST /feed
2. **Backend creates feed** → Database insert + cache invalidation
3. **Socket emission** → `feed:new` event with feed data
4. **Frontend receives** → `useFeed()` hook updates state
5. **UI updates** → New feed renders instantly (no refresh)
6. **Other clients** → Also receive realtime update

### Caching Strategy

- **Cache key**: `feed:list`
- **TTL**: 60 seconds (configurable)
- **Invalidation**: On POST /feed (cache deleted)
- **Fallback**: If Redis unavailable, DB queries work normally

## Validation Rules

### Feed Title
- Required
- Max 255 characters
- Non-empty string

### Feed Message
- Required
- Max 2000 characters
- Non-empty string

## Error Handling

| Scenario | HTTP Status | Response |
|----------|-------------|----------|
| Valid request | 200/201 | `{ success: true, data: ... }` |
| Missing fields | 400 | `{ success: false, error: "..." }` |
| Validation error | 400 | `{ success: false, error: "..." }` |
| Server error | 500 | `{ success: false, error: "..." }` |

## Socket.IO Events

### Client → Server
- `request:feeds` - Ask for initial feeds list

### Server → Client
- `feeds:list` - Send all feeds (response to `request:feeds`)
- `feed:new` - Broadcast new feed to all clients
- `error` - Send error message

## Environment Variables

### Backend (.env)
```env
PORT=3001                          # Express server port
NODE_ENV=development               # development | production
CORS_ORIGIN=*                      # CORS allowed origins
DB_PATH=./data/feeds.db           # SQLite database path
REDIS_URL=redis://localhost:6379   # Redis connection URL
CACHE_TTL=60                        # Cache time-to-live (seconds)
LOG_LEVEL=info                      # debug | info | warn | error
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## Common Issues & Solutions

### ❌ "Cannot find module 'sqlite3'"
**Solution:**
```bash
cd backend
npm install
# If still fails, try:
npm install --build-from-source sqlite3
```

### ❌ "Redis connection failed"
**Solution:** Redis is optional. Backend logs warning but continues without caching.
- To enable caching, start Redis separately
- Or leave default `REDIS_URL=redis://localhost:6379` and ignore warning

### ❌ "Connection refused" when visiting frontend
**Solution:** Ensure backend is running on port 3001
```bash
cd backend
npm run dev
```

### ❌ "Feeds not updating realtime"
**Solution:**
1. Check browser console for WebSocket errors
2. Verify both services running
3. Check CORS setting in backend `.env`
4. Verify `NEXT_PUBLIC_SOCKET_URL` in frontend `.env.local`

### ❌ "Database locked" errors
**Solution:** SQLite may be locked if multiple processes access it. Kill all Node processes:
```bash
taskkill /F /IM node.exe
# Then restart
```

## Performance Considerations

### Optimizations in Place
- ✅ Redis caching for GET /feed (60s TTL)
- ✅ WebSocket instead of polling (efficient realtime)
- ✅ Socket.IO auto-reconnection with exponential backoff
- ✅ Listener cleanup in React hooks (no memory leaks)
- ✅ SQLite for lightweight persistence

### Scalability Path
1. **Database**: Migrate to PostgreSQL for multi-instance
2. **Caching**: Redis cluster for distributed caching
3. **Backend**: Horizontal scaling with load balancer
4. **WebSocket**: Use Redis pub/sub for multi-process Socket.IO
5. **Frontend**: CDN for static assets

## Production Checklist

- [ ] Set `NODE_ENV=production` in backend .env
- [ ] Set strong `CORS_ORIGIN` value (not `*`)
- [ ] Use managed Redis (AWS ElastiCache, Azure Cache, etc.)
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS for Socket.IO
- [ ] Set up monitoring and logging
- [ ] Add authentication/authorization to /admin
- [ ] Use environment secrets manager
- [ ] Configure auto-scaling
- [ ] Set up CI/CD pipeline

## Testing

### Manual Testing Checklist

**Backend API:**
```bash
# Test GET /feed
curl http://localhost:3001/feed

# Test POST /feed
curl -X POST http://localhost:3001/feed \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","message":"Message"}'

# Test health
curl http://localhost:3001/health
```

**Frontend Realtime:**
1. Open two browser tabs with localhost:3000
2. Add feed in /admin
3. Both tabs update simultaneously
4. Check browser DevTools Network tab (WebSocket traffic)

**Connection Resilience:**
1. Start both services
2. Stop backend (Ctrl+C)
3. Verify frontend shows "Connecting..." indicator
4. Restart backend
5. Verify frontend reconnects and reloads feeds

## Troubleshooting Command Reference

```bash
# Windows PowerShell

# Kill all Node processes
taskkill /F /IM node.exe

# Check if port is in use
netstat -ano | findstr :3001
netstat -ano | findstr :3000

# Check npm version
npm --version

# Check Node version
node --version

# Clear npm cache
npm cache clean --force

# Update npm
npm install -g npm@latest
```

## File Size Reference

- Backend build: ~50KB (dist/)
- Frontend build: ~200KB (.next/ - without node_modules)
- Database (initial): <1KB (feeds.db)
- Dependencies combined: ~500MB (node_modules, both projects)

## License

ISC

## Support

For issues or questions:
1. Check browser console for client-side errors
2. Check terminal output for server-side errors
3. Verify `.env` files are configured correctly
4. Ensure all services (Node, Redis) are running
5. Review logs in backend console for detailed errors

---

**Last Updated**: May 18, 2024  
**Next.js**: 14.0.0  
**Node.js**: 18+  
**TypeScript**: 5.1.3+
