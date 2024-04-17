<?php

use App\Core\Database\Schema;

return [
    'admin_settings' => [
        'id' => Schema::increments(),
        'key' => Schema::string(250)->default('user')->nullable()->index(),
        'value' => Schema::string(250)->index()
    ]
];
