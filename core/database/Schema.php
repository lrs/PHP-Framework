<?php

namespace App\Core\Database;

class Schema
{
    public static function increments()
    {
        return 'BIGINT';
    }

    public static function string(int $size = 45)
    {
        return "VARCHAR({$size})";
    }

    public static function password()
    {
        return 'VARCHAR(250)';
    }
}
