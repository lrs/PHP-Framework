<?php

namespace App\Core;

class Request
{
    public static function uri()
    {
        $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return trim($url, '/');
    }

    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
}
