#!/usr/bin/env sh
set -e

php artisan config:clear
php artisan migrate --force

if [ "${RUN_SEEDERS:-false}" = "true" ]; then
    php artisan db:seed --force
fi

php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
