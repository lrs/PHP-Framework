<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;

class PageController extends Controller
{
    public function index()
    {
        $user = User::find(1);

        $params = [
            'name' => $user->name
        ];

        echo view("pages/index", $params);
    }

    public function about()
    {
        echo view("pages/about");
    }

    public function contact()
    {
        echo view("pages/contact");
    }
}
