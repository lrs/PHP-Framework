<?php

use App\Core\Database\Schema;

return [
    'users' => [
        'id' => Schema::increments(),
        'name' => Schema::string(250)->default('user')->nullable()->index(),
        'password' => Schema::string(250)->index()
    ]
];
