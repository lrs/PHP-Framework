<?php

use Dotenv\Dotenv;
use App\Core\Request;
use App\Core\Router;
use App\Core\App;
use App\Core\EventEmitter;
use App\Core\Database\Connection;
use App\Core\Database\QueryBuilder;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

if ('local' == $_ENV['APP_ENV']) {
    // Display errors on page
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
}


session_start([
    'name' => 'php-framework',
    'cookie_samesite' => 'Strict',
    'cookie_secure' => true,
    'cookie_httponly' => true
]);


if (!array_key_exists('csrf', $_SESSION)) {
    $token = bin2hex(random_bytes(30));
    $_SESSION['csrf'] = $token;
}

require 'helpers.php';
require 'twig.php';

// Bind all config files
App::bind('config', loadFiles('config'));

App::bind('emitter', new EventEmitter());

/*
    Set up the Query Builder.

    Usage example:

    $users = App::get('database')
        ->select('users')
        ->where(['id', 1])
        ->get();

    foreach ($users as $key => $user) {
        dump($user->id);
        dump($user->name);
    }
*/
if (array_key_exists('database', App::get('config'))) {
    if (array_key_exists('default', App::get('config')['database'])) {
        App::bind('database', new QueryBuilder(
            Connection::make(App::get('config')['database']['default'])
        ));
    } else {
        throw new Exception("Default database config not found", 1);
    }
} else {
    throw new Exception("Database config file not found", 1);
};

Router::load(glob(__DIR__ . '/../routes/*.php', GLOB_NOSORT))
    ->direct(Request::uri(), Request::method());
