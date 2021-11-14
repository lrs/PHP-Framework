<?php

use App\Core\Database\Schema;

return [
    'users_test' => [
        'id' => Schema::increments(),
        'user' => Schema::string(250)->default('user')->nullable(),
        'password' => Schema::string(250)
    ]
];
