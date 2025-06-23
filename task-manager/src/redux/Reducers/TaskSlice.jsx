const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TASK_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case "FETCH_TASK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        loading: false,
        error: null,
      };
    case "FETCH_UPDATED_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, status: "Completed" } : task
        ),
        loading: false,
        error: null,
      };
    case "CREATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
      };

    case "CREATE_TASK_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "UPDATE_TASK_SUCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),

        loading: false,
      };
    case "UPDATE_TASK_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default TaskReducer;
