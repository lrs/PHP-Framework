<?php

use App\Core\Database\Schema;

return [
    'users' => [
        'id' => Schema::increments(),
        'user' => Schema::string(250),
        'password' => Schema::password()
    ]
];
