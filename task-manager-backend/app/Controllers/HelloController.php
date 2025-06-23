<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class HelloController extends BaseController
{
    public function index()
    {
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'API Working Fine!'
        ]);
    }
}
