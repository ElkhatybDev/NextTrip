# NextTrip

## Overview
Monorepo imported from GitHub for a travel-booking product called "NextTrip":
- `backend/` — Laravel 12 API (PHP), the part currently configured to run on Replit.
- `frontend/` — React app, deployed separately (e.g. Vercel). **Not touched or run on Replit** per user instruction.

## Running the backend on Replit
- Runtime: PHP 8.3 (installed via Nix as `php83` + `php83Extensions.pgsql`/`pdo_pgsql`, since Replit's built-in PHP modules only offer 8.1/8.2/8.4). Composer 2.8 comes from the same Nix package.
- Database: Supabase PostgreSQL (Session Pooler, port 5432, SSL required). **No SQLite or MySQL.**
  - Credentials are stored as Replit Secrets: `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`. They are read live via `env()` — never hardcoded in `backend/.env`.
  - `backend/.env` only sets `DB_CONNECTION=pgsql` and `DB_SSLMODE=require`; the actual host/credentials come from Secrets at runtime.
- Workflow "Start application" runs:
  `cd backend && composer install --no-interaction && php artisan optimize:clear && php artisan serve --no-reload --host=0.0.0.0 --port=${PORT:-3000}`
  - The `--no-reload` flag is required: without it, Laravel's dev server strips non-allowlisted env vars (including the DB secrets) from the request-handling process, so the app silently falls back to `127.0.0.1` and fails to connect. See `.agents/memory/laravel-artisan-serve-env-stripping.md`.
- Migrations have been run against the Supabase database (`php artisan migrate`). Do not re-run destructive migration commands without checking with the user first.

## User preferences
- Backend only: do not install, build, run, or modify the `frontend/` directory unless explicitly asked.
- Do not change Laravel business logic or database migration files.
- Never hardcode database credentials — always via Replit Secrets.
