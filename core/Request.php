<?php

namespace App\Core;

class Request
{
    public static function uri()
    {
        $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        return isset($url) ? trim($url, '/') : null;
    }

    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
}
