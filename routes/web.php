<?php

use App\Core\App;

$config = App::get('config');

// Pages
$router->get(['', '/', 'home'], 'PageController@index');

$router->get(['/about', 'about'], 'PageController@about');
$router->get(['/contact', 'contact'], 'PageController@contact');

$router->get($config['app']['admin'], 'AdminController@index');
