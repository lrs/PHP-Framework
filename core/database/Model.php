<?php

namespace App\Core\Database;

use App\Core\App;

abstract class Model
{
    protected static $table;

    public static function get()
    {
        return App::get('database')
            ->select(static::$table)
            ->all();
    }

    public static function find(int $id)
    {
        return App::get('database')
            ->select(static::$table)
            ->where('id', $id)
            ->first();
    }

    public function save()
    {
        return App::get('database')
           ->insert(static::$table, (array) $this);
    }
}
