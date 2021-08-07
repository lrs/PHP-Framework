<?php

return [
    'default' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE', 'PHP-Framework'),
        'username' => env('DB_USERNAME', 'PHP-Framework'),
        'password' => env('DB_PASSWORD', 'PHP-Framework'),
        'options'  => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    ]
];
