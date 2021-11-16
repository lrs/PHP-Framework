<?php

namespace App\Core;

abstract class Controller
{
    abstract public function index();

    public function notFound()
    {
        echo view("errors/404");
    }
}
