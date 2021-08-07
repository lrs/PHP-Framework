<?php

use App\Core\Storage;

// dump.
function dump($data)
{
    var_dump($data);
}

// dump and die.
function dd($data)
{
    die(var_dump($data));
}

function env(string $key, string $default = '')
{
    return isset($_ENV[$key]) ? $_ENV[$key] : $default;
}

function redirect($path)
{
    header("Location: /{$path}");
}

function dateStamp()
{
    $d = getdate();
    $m = $d['mon'] < 10 ? '0' . $d['mon'] : $d['mon'];
    $day =  $d['mday'] < 10 ? '0' . $d['mday'] : $d['mday'];
    $h =  $d['hours'] < 10 ? '0' . $d['hours'] : $d['hours'];
    $min =  $d['minutes'] < 10 ? '0' . $d['minutes'] : $d['minutes'];
    $s =  $d['seconds'] < 10 ? '0' . $d['seconds'] : $d['seconds'];
    return "{$d['year']}-{$m}-{$day}T{$h}:{$min}:{$s}";
}

function guid()
{
    // For Windows
    if (function_exists('com_create_guid')) {
        return trim(com_create_guid(), '{}');
    }

    if (function_exists('random_int')) {
        return sprintf(
            '%04X%04X-%04X-%04X-%04X-%04X%04X%04X',
            random_int(0, 65535),
            random_int(0, 65535),
            random_int(0, 65535),
            random_int(16384, 20479),
            random_int(32768, 49151),
            random_int(0, 65535),
            random_int(0, 65535),
            random_int(0, 65535)
        );
    } else {
        return sprintf(
            '%04X%04X-%04X-%04X-%04X-%04X%04X%04X',
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(16384, 20479),
            mt_rand(32768, 49151),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535)
        );
    }
}

function logText($msg, $title = 'PHP-Framework')
{
    $date = date("Ymd");
    $time = date("His");

    $path = "logs/{$title}_{$date}.log";

    $msg = "$time: $msg";

    try {
        if (Storage::disk('local')->exists($path)) {
            Storage::disk('local')->append($path, $msg);
        } else {
            Storage::disk('local')->put($path, $msg);
        }
    } catch (\Throwable $th) {
        throw $th;
    }
}
