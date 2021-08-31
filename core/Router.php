<?php

namespace App\Core;

class Router
{
    protected $routes = [
        'GET' => [],
        'POST' => []
    ];

    public static function load(array $files)
    {
        $router = new static();

        foreach ($files as $file) {
            include $file;
        }

        return $router;
    }

    public function get($uri, $controller)
    {
        $this->routes['GET'][$uri] = $controller;
    }

    public function post($uri, $controller)
    {
        $this->routes['POST'][$uri] = $controller;
    }

    public function direct($uri, $requestMethod)
    {
        if (array_key_exists($uri, $this->routes[$requestMethod])) {
            return $this->callAction(
                ...explode('@', $this->routes[$requestMethod][$uri])
            );
        }

        return $this->callAction('PageController', 'notFound');
    }

    protected function callAction($controller, $action)
    {
        $controller = "\App\\Controllers\\{$controller}";

        $controllerClass = new $controller();

        if (method_exists($controller, $action)) {
            return $controllerClass->$action();
        }

        throw new \Exception("'{$controller}' has no method for '{$action}'");
    }
}
