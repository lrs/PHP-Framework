<?php

namespace App\Core;

use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Exception\ParseException;

class Translate
{
    private string $locale;

    public function __construct(string $locale = null)
    {
        $this->locale = isset($locale)?: env('APP_LOCALE', 'en');
    }

    public function get(string $text)
    {
        try {
            return Yaml::parseFile(__DIR__ . "/../resources/lang/{$this->locale}.yaml")[$text];
        } catch (ParseException $err) {
            logText($err->getMessage());
            
            return $text;
        }
    }
}
