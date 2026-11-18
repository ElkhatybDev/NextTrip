<?php

$allowedOrigins = array_filter(array_map(
    'trim',
    explode(',', env('CORS_ALLOWED_ORIGINS', '*'))
));

$allowedOriginPatterns = array_filter(array_map(
    'trim',
    explode(',', env('CORS_ALLOWED_ORIGINS_PATTERNS', ''))
));

return [
    'paths' => ['api/*', 'up'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $allowedOrigins ?: ['*'],

    'allowed_origins_patterns' => $allowedOriginPatterns,

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
