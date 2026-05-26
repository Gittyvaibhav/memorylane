# MemoryLane Backend

Minimal backend scaffold for MemoryLane. Provides:
- Auth (register, login, me) with JWT and bcrypt
- File indexing services (OCR, PDF parsing)
- Meilisearch integration
- Redis caching
- File watcher (chokidar)

Quick start:

```bash
cd memorylane/backend
npm install
cp .env.example .env
# edit .env to your environment
npm run dev
```

Docker (requires Docker Compose):

```bash
docker compose up --build
```

Notes:
- Tesseract and PDF parsing may require additional system dependencies.
- Meilisearch should be reachable via `MEILISEARCH_HOST`.
