# Get Your Furniture

A basic monorepo template for a used-furniture marketplace:
- Frontend: Nuxt 3 (TypeScript)
- Backend: Express (TypeScript) + Prisma
- Database: PostgreSQL (local install for dev; Vercel Postgres/Neon/Supabase for prod)

## Quick Start (Local Dev)

1) Prerequisites
- Node.js 18+
- Local PostgreSQL 14+ installed and running (no Docker required)

2) Install dependencies
```bash
# From repo root
npm install
```

3) Configure environment
- Create `apps/backend/.env`
```
PORT=4000
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dev_db>?schema=public"
CORS_ORIGIN="http://localhost:3000"
```
- (Optional) Create `apps/frontend/.env`
```
NUXT_PUBLIC_API_BASE="http://localhost:4000"
```
If omitted, frontend defaults to `http://localhost:4000`.

4) Prepare database (backend)
```bash
# From apps/backend
npm run prisma:generate
npm run prisma:migrate
```

5) Run services
- Backend (http://localhost:4000)
```bash
# From apps/backend
npm run dev
```
- Frontend (http://localhost:3000)
```bash
# From apps/frontend
npm run dev
```

## API Overview
Base URL: `http://localhost:4000/api`

- GET `/listings` → list all listings
- GET `/listings/:id` → get one listing
- POST `/listings` → create a listing
- PUT `/listings/:id` → update a listing
- DELETE `/listings/:id` → delete a listing

Example JSON body for create/update:
```json
{
  "title": "Vintage chair",
  "description": "Solid wood, minor scratches",
  "priceCents": 4500,
  "condition": "GOOD",
  "location": "Seoul",
  "imageUrl": "https://example.com/chair.jpg"
}
```

## Prod Deployment (Vercel)
- Deploy as two Vercel projects (monorepo):
  - Frontend root: `apps/frontend`
  - Backend root: `apps/backend` (serverless via `api/index.ts`)
- Backend env vars on Vercel:
  - `DATABASE_URL` (Vercel Postgres/Neon/Supabase)
  - `CORS_ORIGIN` (your frontend URL)
- Frontend env var on Vercel:
  - `NUXT_PUBLIC_API_BASE` (your backend URL)
- Apply schema on prod DB once: `npx prisma migrate deploy`

## Notes
- Prisma Studio: `npm run prisma:studio` in `apps/backend`.
