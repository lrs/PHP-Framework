<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;

class AdminController extends Controller
{
    // If logged in as admin!
    public function index()
    {
        $user = User::find(1);

        $params = [
            'name' => $user->name
        ];

        echo view("pages/admin", $params);
    }
}
