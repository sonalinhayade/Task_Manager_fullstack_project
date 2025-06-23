const BASEURL = import.meta.env.VITE_API_URL;

export const GET_ALL_TASKS = `${BASEURL}/all-task`;
export const GET_DELETED_TASKS = `${BASEURL}/delete-task`;
export const GET_COMPLETE_UPDATE = `${BASEURL}/update-status`;
export const GET_CREATE_TASK = `${BASEURL}/add-task`
export const GET_UPDATE_TASK = `${BASEURL}/update-task`;


// $routes->get('/all-task', 'TaskController::index'); // Find all tasks
// $routes->post('/add-task', 'TaskController::create'); // Create a new task
// $routes->get('/show-task/(:num)', 'TaskController::show/$1'); // Find a task by ID
// $routes->put('/update-task/(:num)', 'TaskController::update/$1'); // Update a task by ID
// $routes->delete('/delete-task/(:num)', 'TaskController::delete/$1'); // Delete a task by ID
// $routes->put('/update-status/(:num)','TaskController::MarkAsCompleted/$1'); // Mark a task as completed
