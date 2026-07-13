---
name: Laravel artisan serve env stripping
description: Why DB/secret env vars are missing inside `php artisan serve` request handlers even though they exist in the parent shell.
---

Laravel's `ServeCommand::startProcess()` only passes through a small allowlist of env vars (`$passthroughVariables`, e.g. APP_ENV, PATH) to the actual PHP built-in server child process it spawns. Every other env var — including custom secrets like DB_HOST/DB_PASSWORD injected by the platform — is explicitly unset for that child process. This is intentional: it powers the "auto-reload workers when .env changes" feature.

**Why:** `artisan serve` re-execs its worker process and, by default, deliberately strips non-allowlisted env vars so a stale worker can't serve with an outdated environment after a `.env` edit. This makes it look like secrets "aren't visible" to the app even though `getenv()`/`$_ENV` show them fine in any other CLI invocation (tinker, config:show, plain shell).

**How to apply:** When running `php artisan serve` under a process manager/workflow that relies on real OS/platform env vars (not just `.env` file values) for things like external database credentials, always add the `--no-reload` flag. Without it, DB connections (and anything else read via `env()` that isn't in the allowlist) silently fall back to their config defaults, producing confusing "connection refused to 127.0.0.1" style errors even though the credentials are correctly set in the environment.
