<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\TaskModel;
use CodeIgniter\HTTP\ResponseInterface;

class TaskController extends BaseController
{
    protected $taskmodel;

    public function __construct()
    {
        $this->taskmodel = new TaskModel();
    }
    public function index()
    {
        // Find all tasks 
        $tasks = $this->taskmodel->findAll();
        return $this->response->setStatusCode(200)->setJSON([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    public function create()
    {
        //validation rules 
        $jsonData = $this->request->getJSON(true);

        $validation = [
            'title' => [
                'rules' => 'required|min_length[3]|max_length[100]',
                'errors' => [
                    'required' => 'Title is required',
                    'min_length' => 'Title must be at least 3 characters long',
                    'max_length' => 'Title must not exceed 100 characters'
                ]
            ],
            'description' => [
                'rules' => 'min_length[3]|max_length[500]',
                'errors' => [
                    'min_length' => 'Description must be at least 3 characters long',
                    'max_length' => 'Description must not exceed 500 characters'
                ]
            ],
            'start_date' => [
                'rules' => 'required|valid_date[Y-m-d]',
                'errors' => [
                    'required' => 'Start date is required',
                    'valid_date' => 'Start date must be in format YYYY-MM-DD'
                ]
            ],
            'end_date' => [
                'rules' => 'valid_date',
                'errors' => [
                    'valid_date' => 'End date must be a valid date'
                ]
            ],
            'status' => [
                'rules' => 'in_list[Pending,In Progress,Completed]',
                'errors' => [
                    'in_list' => 'Status must be one of the following: Pending, In Progress, Completed'
                ]
            ],
            'priority' => [
                'rules' => 'in_list[Low,Medium,High]',
                'errors' => [
                    'in_list' => 'Priority must be one of the following: Low, Medium, High'
                ]
            ],
        ];

        if (!$this->validate($validation, $jsonData)) {
            // Validation failed
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'errors' => $this->validator->getErrors()
            ]);
        }

        $existingData = $this->taskmodel
            ->where('title', $jsonData['title'])
            ->where('start_date', $jsonData['start_date'])
            ->first();

        if ($existingData) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'message' => 'Task with the same title and start date already exists'
            ]);
        }

        if (!$this->taskmodel->save($jsonData)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'message' => 'Failed to create task'
            ]);
        }
        return $this->response->setStatusCode(200)->setJSON([
            'status' => 'success',
            'message' => 'Task created successfully',
            'data' => $jsonData
        ]);
    }

    public function show($id)
    {
        $taskData = $this->taskmodel->find($id);
        if (!$taskData) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => 'error',
                'message' => 'Task not found'
            ]);
        }

        return $this->response->setStatusCode(200)->setJSON([
            'status' => 'success',
            'message' => 'Task found',
            'data' => $taskData
        ]);
    }

    public function update($id)
    {
        $updateData = $this->request->getJSON(true);

        $validation = [
            'title' => [
                'rules' => 'required|min_length[3]|max_length[100]',
                'errors' => [
                    'required' => 'Title is required',
                    'min_length' => 'Title must be at least 3 characters long',
                    'max_length' => 'Title must not exceed 100 characters'
                ]
            ],
            'description' => [
                'rules' => 'min_length[3]|max_length[500]',
                'errors' => [
                    'min_length' => 'Description must be at least 3 characters long',
                    'max_length' => 'Description must not exceed 500 characters'
                ]
            ],
            'start_date' => [
                'rules' => 'required|valid_date',
                'errors' => [
                    'required' => 'Start date is required',
                    'valid_date' => 'Start date must be in format YYYY-MM-DD'
                ]
            ],
            'end_date' => [
                'rules' => 'permit_empty|valid_date',
                'errors' => [
                    'valid_date' => 'End date must be a valid date'
                ]
            ],
            'status' => [
                'rules' => 'in_list[Pending,In Progress,Completed]',
                'errors' => [
                    'in_list' => 'Status must be one of the following: Pending, In Progress, Completed'
                ]
            ],
            'priority' => [
                'rules' => 'in_list[Low,Medium,High]',
                'errors' => [
                    'in_list' => 'Priority must be one of the following: Low, Medium, High'
                ]
            ],
        ];

        if (!$this->validate($validation, $updateData)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'errors' => $this->validator->getErrors()
            ]);
        }

        $updateId = $this->taskmodel->find($id);
        if (!$updateId) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => 'error',
                'message' => 'Task not found',
            ]);
        }

        if (!$this->taskmodel->update($id, $updateData)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'message' => 'Failed to update task'
            ]);
        }
        return $this->response->setStatusCode(200)->setJSON([
            'status' => 'success',
            'message' => 'Task updated successfully',
            'data' => $updateData
        ]);
    }

    public function delete($id)
    {
        $deleteId = $this->taskmodel->find($id);
        if (!$deleteId) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => 'error',
                'message' => 'Task not found'
            ]);
        }
        if (!$this->taskmodel->delete($id)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'message' => 'Failed to delete task'
            ]);
        }
        return $this->response->setStatusCode(200)->setJSON([
            'status' => 'success',
            'message' => 'Task deleted successfully'
        ]);
    }

    public function MarkAsCompleted($id){
        $completedData = $this->taskmodel->find($id);
        if(!$completedData){
            return $this->response->setStatusCode(404)->setJSON([
                'status' => 'error',
                'message' => 'Task not found'
            ]);
        }

        if($completedData['status']==='Completed'){
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'message' => 'Task already completed'
            ]);
        }
        $taskcompleted = $this->taskmodel->update($id,['status'=>'Completed']);
        return $this->response->setStatusCode(200)->setJSON([
            'status' => 'success',
            'message' => 'Task marked as completed successfully',
            'data' => $taskcompleted
        ]);

    }
}


// Options -Indexes

// <IfModule mod_rewrite.c>
//   RewriteEngine On
//   RewriteBase /frontend/

//   RewriteCond %{REQUEST_FILENAME} !-f
//   RewriteCond %{REQUEST_FILENAME} !-d
//   RewriteRule ^ index.html [L]
// </IfModule>
