import React from "react";
import { TaskCard } from "../groupComponents/TaskCard";
import { useSelector } from "react-redux";

export const InProgress = () => {
  const { tasks } = useSelector((state) => state.task);
  const InProgress = tasks.filter((tasks) => tasks.status === "In Progress");
  return (
    <>
      <div className="text-center my-4">
        <h2 className="fw-bold text-info">
        <i className="bi bi-hourglass-split me-2 text-primary"></i>🧩 In Progress Tasks
        </h2>
        <p className="text-muted fs-5 fst-italic">
          <span className="me-2">⏳</span>"Even 1% better today is a win. Stack
          it daily."<span className="ms-2">💡</span>
        </p>
      </div>

      <TaskCard tasks={InProgress} />
    </>
  );
};
