# MemoryLane

MemoryLane is a file discovery and indexing app. It watches selected folders on a user's device, extracts text from supported files, stores file metadata in MongoDB, pushes searchable content into Meilisearch, and exposes both a backend API and a React frontend for natural-language search.

## What this repo contains

- `backend/` — Express API, MongoDB models, file extraction, indexing, search, and watcher services.
- `frontend/` — Vite + React UI for login, search, and dashboard flows.
- `docker-compose.yml` — MongoDB, Meilisearch, Redis, and backend service definitions for local containerized development.
- `tracked_node_modules.txt` — reference file used while cleaning large tracked dependencies.

## Tech stack

### Backend

- Node.js with ES modules.
- Express for HTTP routes and middleware.
- Mongoose for MongoDB access.
- Meilisearch for full-text search.
- Redis via ioredis for caching.
- bcryptjs and jsonwebtoken for auth.
- chokidar for filesystem watching.
- pdf-parse, mammoth, and tesseract.js for file extraction.

### Frontend

- React 18.
- Vite for development and bundling.
- axios for API requests.
- react-router-dom for routing.
- lucide-react for icons.

## Architecture overview

The backend is organized around a small pipeline:

1. The watcher service monitors folders listed in `WATCHED_FOLDERS`.
2. When a file is added or changed, the app extracts text according to file type.
3. The index service upserts file metadata into MongoDB.
4. The same service pushes a document into the Meilisearch `files` index.
5. Search requests query Meilisearch, and common results can be cached in Redis.

The frontend talks to the backend through the axios instance in `frontend/src/api/axiosInstance.js`. Authentication is handled with JWT stored in localStorage.

## Backend structure

- `backend/src/app.js` — app bootstrap, route registration, DB connection, and watcher startup.
- `backend/src/config/db.js` — MongoDB connection helper.
- `backend/src/config/meilisearch.js` — Meilisearch client creation.
- `backend/src/config/redis.js` — Redis client creation.
- `backend/src/config/arcjet.js` — currently a safe stub so the app can boot without a strict Arcjet dependency.
- `backend/src/models/` — Mongoose models for users, files, and search logs.
- `backend/src/controllers/` — request handlers for auth, file, and search APIs.
- `backend/src/routes/` — route definitions.
- `backend/src/services/` — extraction, indexing, search, and watcher logic.
- `backend/scripts/create_index_and_add_sample.mjs` — helper script to create the `files` index and validate a sample search.

## Frontend structure

- `frontend/src/App.jsx` — top-level routing and provider wiring.
- `frontend/src/context/AuthContext.jsx` — login, logout, and user state.
- `frontend/src/components/` — reusable UI pieces like navbar, protected route, search bar, and file cards.
- `frontend/src/pages/` — main screens such as home, login, register, and dashboard.
- `frontend/src/hooks/useSearch.js` — search helper that calls the backend search API.

## Local development

### Recommended path

Use Docker Compose from the repo root if Docker is available:

```bash
docker compose up --build
```

That starts:

- MongoDB on `27017`
- Meilisearch on `7700`
- Redis on `6379`
- Backend on `5000`

### If you run services manually

Create `backend/.env` from `backend/.env.example`, then set values for your local environment. The important keys are:

- `MONGODB_URI`
- `REDIS_URL`
- `MEILISEARCH_HOST`
- `JWT_SECRET`
- `WATCHED_FOLDERS`

Then run:

```bash
cd backend
npm install
npm run dev
```

And in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

By default the frontend uses `VITE_API_URL` if set, otherwise it falls back to `/api`.

## Meilisearch bootstrap and verification

The repository includes `backend/scripts/create_index_and_add_sample.mjs`. It:

- waits for Meilisearch to become reachable,
- creates the `files` index if it is missing,
- uploads a sample document,
- performs a test search.

Run it from `backend/`:

```bash
node scripts/create_index_and_add_sample.mjs
```

## Indexing flow

The indexing flow is designed to keep MongoDB and Meilisearch in sync:

- `indexService.indexFile()` saves metadata into MongoDB and indexes searchable fields into Meilisearch.
- `indexService.removeFile()` removes the document from both stores.
- `watcherService.watchFolders()` observes the configured folder list and calls the index service when files change.

Supported extraction paths include:

- PDF text via `pdf-parse`
- DOCX content via `mammoth`
- OCR via `tesseract.js` for image files

## Authentication

Authentication is JWT-based. The backend hashes passwords with `bcryptjs`, signs tokens with `jsonwebtoken`, and the frontend persists the token in localStorage so it can be sent in the Authorization header.

## Current limitations and notes

- Docker is not available in this workspace, so I could not start MongoDB, Redis, or Meilisearch here.
- The backend runtime still expects a live MongoDB URI before it will boot.
- Tailwind/PostCSS were trimmed in the frontend package so `npm install` and `vite` can run in this environment without extra plugin resolution. If you want the original Tailwind setup back, restore the dev dependencies and the PostCSS plugin configuration.
- Arcjet is intentionally stubbed to avoid blocking the app on an incompatible package export during local development.

## Files worth reading first

- `backend/src/app.js`
- `backend/src/services/indexService.js`
- `backend/src/services/watcherService.js`
- `backend/src/services/searchService.js`
- `frontend/src/api/axiosInstance.js`
- `frontend/src/context/AuthContext.jsx`

## Troubleshooting

- If the backend exits with `MONGODB_URI not set`, create `backend/.env` and set a valid URI.
- If Meilisearch imports fail, check `backend/src/config/meilisearch.js`. The installed package exports `Meilisearch` as a named export.
- If the frontend crashes on startup because of PostCSS or Tailwind, make sure your installed dependencies match `frontend/package.json` and that `frontend/postcss.config.cjs` matches those dependencies.

## Suggested next steps

1. Restore Docker locally and run `docker compose up --build` to verify the full backend stack.
2. Re-enable the Tailwind/PostCSS frontend stack if you want the original styled UI.
3. Add automated tests for indexing, search, and auth flows.
