import { toast } from "react-toastify";
import {
  GET_ALL_TASKS,
  GET_COMPLETE_UPDATE,
  GET_CREATE_TASK,
  GET_DELETED_TASKS,
  GET_UPDATE_TASK,
} from "../../Services/Api";

export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_TASK_REQUEST" });
    try {
      const response = await fetch(GET_ALL_TASKS);
      if (!response.ok) {
        throw new Error("Failed to fetch the tasks");
      }

      const result = await response.json();
      dispatch({ type: "FETCH_TASK_SUCCESS", payload: result.data });
    } catch (error) {
      dispatch({ type: "FETCH_TASK_FAILURE", payload: error.message });
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_TASK_REQUEST" });
    try {
      const response = await fetch(`${GET_DELETED_TASKS}/${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the task");
      }

      dispatch({ type: "GET_DELETE_TASK", payload: id });
      toast.success("Task Deleted Successfully");
    } catch (error) {
      dispatch({ type: "FETCH_TASK_FAILURE", payload: error.message });
    }
  };
};

export const markAsComplete = (id) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_TASK_REQUEST" });
    try {
      const response = await fetch(`${GET_COMPLETE_UPDATE}/${id}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to Update the status");
      }
      dispatch({ type: "FETCH_UPDATED_STATUS", payload: id });
      toast.success("Task mark as completed");
    } catch (error) {
      dispatch({ type: "FETCH_TASK_FAILURE", payload: error.message });
    }
  };
};

export const createTask = (taskData) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_TASK_REQUEST" });
    try {
      const response = await fetch(`${GET_CREATE_TASK}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      console.log("🚀 ~ TaskAction.jsx:67 ~ return ~ response:", response);
      const result = await response.json();

      if (!response.ok) {
        throw new Error("failed to create task");
      }
      dispatch({ type: "CREATE_TASK_SUCCESS", payload: result.data });
      toast.success("Task Created Successfully!");
    } catch (error) {
      dispatch({ type: "CREATE_TASK_FAIL", payload: error.message });
      toast.success("Failed to create task!");
    }
  };
};

export const updateTask = (taskData) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_TASK_REQUEST" });
    try {
      const response = await fetch(`${GET_UPDATE_TASK}/${taskData.id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      console.log("🚀 ~ TaskAction.jsx:97 ~ return ~ response:", response);
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Failed to update the task");
      }

      dispatch({ type: "UPDATE_TASK_SUCESS", payload: result.data });
      dispatch(fetchTasks())
      toast.success("Task Updated Successfully!");
    } catch (error) {
      dispatch({ type: "UPDATE_TASK_FAIL", payload: error.message });
      toast.success("Failed to update task!");
    }
  };
};
