<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->options('(:any)', function () {
    return response()->setStatusCode(200);
});
$routes->get('/hello', 'HelloController::index');
$routes->get('/', 'Home::index');
$routes->get('/db', 'DbController::index');
$routes->get('/all-task', 'TaskController::index'); // Find all tasks
$routes->post('/add-task', 'TaskController::create'); // Create a new task
$routes->get('/show-task/(:num)', 'TaskController::show/$1'); // Find a task by ID
$routes->post('/update-task/(:num)', 'TaskController::update/$1'); // Update a task by ID
$routes->post('/delete-task/(:num)', 'TaskController::delete/$1'); // Delete a task by ID
$routes->post('/update-status/(:num)','TaskController::MarkAsCompleted/$1'); // Mark a task as completed


