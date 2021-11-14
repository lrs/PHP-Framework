<?php

namespace App\Database;

use App\Core\App;

class Migrate
{
    public $migrations = [];

    public function __construct()
    {
        // get all migrations
        $this->migrations = loadFiles('database/migrations');
    }

    // run them
    public function run()
    {
        foreach ($this->migrations as $file => $migrations) {
            $query = '';

            if (0 === mb_strpos($file, 'create_table_')) {
                foreach ($migrations as $table => $definition) {
                    $primary = '';

                    $query = "CREATE TABLE IF NOT EXISTS `{$table}` (";

                    foreach ($definition as $column => $type) {
                        $separator = $column === array_key_last($definition) ? '' : ', ';

                        if (false !== mb_stripos($type->type, 'auto_increment')) {
                            $primary = $column;
                        }

                        $query = $query . "`{$column}` {$type->type} {$type->default} {$type->null}{$separator}";
                    }

                    if (!empty($primary)) {
                        $query = $query . ", PRIMARY KEY (`{$primary}`)";
                    }

                    $query = $query . ')';
                }
            }

            echo $query;

            dump(App::get('database')->raw($query));
        }
    }
}
