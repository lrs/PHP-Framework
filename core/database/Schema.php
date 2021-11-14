<?php

namespace App\Core\Database;

class Schema
{
    public $type = false;
    public $default = false;
    public $null = 'NOT NULL';
    public $index = false;

    public function __construct($type)
    {
        $this->type = $type;
    }

    public function nullable()
    {
        $this->null = 'NULL';

        return $this;
    }

    public function index()
    {
        $this->index = true;

        return $this;
    }

    public function default($default)
    {
        if ("string" === gettype($default)) {
            $this->default = "DEFAULT '{$default}'";
        } else {
            $this->default = "DEFAULT {$default}";
        }

        return $this;
    }

    public static function increments()
    {
        return new Schema('INT(10) UNSIGNED AUTO_INCREMENT');
    }

    public static function string(int $size = 45)
    {
        return new Schema("VARCHAR({$size})");
    }
}
