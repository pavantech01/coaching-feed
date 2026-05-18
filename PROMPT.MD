# Realtime Coaching Feed App

## Objective
Build a production-ready realtime coaching feed application with scalable architecture, clean code, and proper realtime implementation.

---

# Stack

## Frontend
- Next.js
- TypeScript
- TailwindCSS

## Backend
- Node.js
- Express
- Socket.IO
- Minimal Redis cache for `GET /feed`
- Embedded lightweight SQL database (SQLite/local in-memory style)

## Constraints
- No Docker

---

# Backend Architecture

Strict backend layering:

```text
model -> DAO -> service -> controller -> routes
```

# Litral prompt
Build production-grade realtime coaching feed platform with senior/top-SDE level engineering quality.

Tech Stack:
Frontend:

* Next.js latest
* TypeScript
* TailwindCSS

Backend:

* Node.js + Express
* Socket.IO
* Minimal Redis usage only for GET /feed caching
* Embedded lightweight SQL database (SQLite/H2-style in-memory/local DB)
* No Docker

Backend Architecture (strict):

* Model
* DAO/Repository
* Service
* Controller
* Routes
* Middleware
* Utils
* Config
* Socket Manager

Core APIs:

* GET /feed
* POST /feed

Core Features:

* Admin page → create feed
* Home page → realtime feed stream
* Instant realtime updates without refresh
* Redis cache for GET /feed
* Cache invalidation after POST
* Socket reconnect handling
* Prevent duplicate socket listeners/events
* Proper socket cleanup
* Optimistic scalability design
* Loading/error states
* Validation everywhere

Engineering Expectations (Top SDE Quality):

* Production-ready clean architecture
* SOLID principles
* Separation of concerns
* Reusable abstractions
* Highly readable maintainable code
* Scalable folder structure
* Proper naming conventions
* Consistent error handling
* Async-safe implementation
* Defensive coding practices
* Clean API contracts
* Reusable service layer
* Extensible realtime architecture
* Avoid tight coupling
* No unnecessary rerenders
* Efficient websocket lifecycle handling
* Prevent memory leaks
* Efficient caching strategy
* Proper state synchronization
* Minimal duplicate API/socket calls
* Clean reconnection strategy
* Race-condition-safe updates
* Structured logging
* Environment-based configs
* Proper .gitignore production-ready
* No hardcoded configs/secrets

Scalability Thinking:

* Design socket layer for future multi-room/channel support
* DAO abstraction for future DB migration
* Cache abstraction layer
* Pagination-ready APIs
* Extensible event architecture
* Service isolation for future microservice migration
* Reusable API response wrappers
* Realtime event naming conventions
* Future-ready authentication hooks

Frontend Requirements:

* Reusable components
* API abstraction layer
* Socket service abstraction
* Responsive modern UI
* Loading skeletons
* Empty/error states
* Toast notifications
* Proper hooks architecture
* Avoid duplicate websocket subscriptions
* Stable state updates
* Type-safe API models

Database:
Feed table:

* id
* title
* message
* created_at

Deliverables:

* Complete frontend
* Complete backend
* Embedded DB setup
* Redis integration
* Socket.IO realtime implementation
* Production-ready .gitignore
* README with exact Windows setup steps
* Sample .env
* Clean project structure
* Fully working application end-to-end

Important:
Application must look like written by experienced SDE.
Focus heavily on:

* Code quality
* Problem solving
* Realtime implementation
* Scalability thinking
* Clean architecture
* Production readiness
* Debuggability
* Maintainability

Avoid:

* Monolithic files
* Bad socket lifecycle handling
* Duplicate listeners
* Tight coupling
* Inline business logic
* Poor folder structure
* Unhandled async flows
* Memory leaks
* Fragile state management

Generate complete working codebase with no pseudo-code.


