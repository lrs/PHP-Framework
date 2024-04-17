<?php

// Pages
$router->get(['', '/', 'home'], 'PageController@index');

$router->get(['/about', 'about'], 'PageController@about');
$router->get(['/contact', 'contact'], 'PageController@contact');
