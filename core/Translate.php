<?php

namespace App\Core;

use Symfony\Component\Yaml\Yaml;

class Translate
{
    private string $locale;

    public function __construct()
    {
        $this->locale = env('APP_LOCALE', 'en');
    }
    public function get(string $text)
    {
        return Yaml::parseFile(__DIR__ . "/../resources/lang/{$this->locale}.yaml")[$text];
    }
}