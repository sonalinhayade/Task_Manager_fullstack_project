import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "../Reducers/TaskSlice";

const store = configureStore({
  reducer: {
    task: TaskReducer,
  },
});


export default store;
