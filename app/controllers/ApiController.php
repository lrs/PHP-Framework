<?php

namespace App\Controllers;

use App\Core\Controller;

class ApiController extends Controller
{
    public function index()
    {
        if (!array_key_exists('csrf', $_SESSION)) {
            $token = bin2hex(random_bytes(30));
            $_SESSION['csrf'] = $token;
        }

        echo $_SESSION['csrf'];
    }

    public function consent()
    {
        echo 'session_consent';
    }
}
