import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../components/coreComponents/Dashboard";
import { CompletedTask } from "../components/coreComponents/CompletedTask";
import { PendingTask } from "../components/coreComponents/PendingTask";
import { InProgress } from "../components/coreComponents/InProgress";
import { AddNewTask } from "../components/coreComponents/AddNewTask";
import { TaskStatus } from "../components/coreComponents/TaskStatus";
import App from "../App";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/completed-tasks",
          element: <CompletedTask />,
        },
        {
          path: "/pending-tasks",
          element: <PendingTask />,
        },
        {
          path: "/in-progress-tasks",
          element: <InProgress />,
        },
        {
          path: "/add-new-task",
          element: <AddNewTask />,
        },
        // {
        //   path: "/task-status",
        //   element: <TaskStatus />,
        // },
      ],
    },
  ],
  {
    basename: "/frontend", // ✅ Add this line
  }
);

export default router;
