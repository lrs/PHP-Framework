<?php

namespace App\Core\Database;

use PDO;

class Connection
{
    public static function make($config)
    {
        try {
            return new PDO(
                "{$config['driver']}:host={$config['host']};dbname={$config['database']}",
                $config['username'],
                $config['password'],
                $config['options']
            );
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 1);
        }
    }
}
