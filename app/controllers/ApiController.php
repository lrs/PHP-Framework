<?php

namespace App\Controllers;

use App\Core\Controller;

class ApiController extends Controller
{
    public function index()
    {
        echo 'session_token';
    }

    public function consent()
    {
        echo 'session_consent';
    }
}
