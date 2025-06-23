import React from "react";
import { TaskCard } from "../groupComponents/TaskCard";
import { useSelector } from "react-redux";
export const PendingTask = () => {
  const { tasks } = useSelector((state) => state.task);

  const PendingTasks = tasks.filter((tasks) => tasks.status === "Pending");

  return (
    <>
      <div className="text-center my-4">
        <h2 className="fw-bold text-warning">
          <i className=" me-2 text-orange"></i>
          🕰️ Pending Tasks
        </h2>
        <p className="text-muted fs-5 fst-italic">
          <span className="me-2">⏳</span>"Pending doesn’t mean paused — it’s
          just your next power move waiting."<span className="ms-2">💡</span>
        </p>
      </div>

      <TaskCard tasks={PendingTasks} />
    </>
  );
};
