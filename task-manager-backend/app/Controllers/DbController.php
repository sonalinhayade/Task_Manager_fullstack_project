<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Database;

class DbController extends BaseController
{
    public function index()
    {
        $database = Database::connect();
        $database->initialize();
        if($database->connID!==false){
            return "Database connection is successful";
        }
        else{
            return "Database connection failed";
        }
    }
}
