<?php

namespace App\Core;

class Translate
{
    private string $locale;

    public function __construct()
    {
        $this->locale = env('APP_LOCALE', 'en');
    }
    public function get(string $text)
    {
        return "{$text} ({$this->locale})";
    }
}
