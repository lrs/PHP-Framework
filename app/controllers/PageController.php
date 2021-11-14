<?php

namespace App\Controllers;

use App\Models\User;
use App\Database\Migrate;

class PageController
{
    public function index()
    {
        $user = User::find(1);

        $params = [
            'name' => $user->name
        ];

        echo view("pages/index", $params);

        $temp = new Migrate();

        $temp->run();
    }

    public function notFound()
    {
        echo view("errors/404");
    }
}
