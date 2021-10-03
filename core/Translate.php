<?php

namespace App\Core;

class Translate
{
    private $locale = 'en';

    public static function get(string $text)
    {
        return "{$text}";
    }
}
