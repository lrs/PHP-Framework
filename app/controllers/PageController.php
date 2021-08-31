<?php

namespace App\Controllers;

use App\Models\User;

class PageController
{
    public function index()
    {
        $user = User::find(1);

        $params = [
            'name' => $user->name
        ];

        echo view("pages/index", $params);

        phpinfo();
    }

    public function notFound()
    {
        echo view("errors/404");
    }
}
