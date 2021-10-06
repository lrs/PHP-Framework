<?php

namespace App\Database;

class Migrate
{
    public $migrations = [];

    public function __construct()
    {
        // get all migrations
        $this->migrations = loadFiles('database/migrations');
    }

    // run them
}
