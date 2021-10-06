<?php

namespace App\Database;

class Migrate
{
    public $migrations = [];

    public function get()
    {
        // get all migrations
        foreach (glob(__DIR__ . '/../database/migrations/*.php', GLOB_NOSORT) as $filename) {
            $migrationName = basename($filename, '.php');

            $currMigration = include $filename;

            $this->migrations[$migrationName] = $currMigration;
        }
    }

    // run them
}
