import React from "react";
import { TaskCard } from "../groupComponents/TaskCard";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const { tasks} = useSelector((state) => state.task);

  return (
    <>
      <div className="text-center my-4">
        <h2 className="fw-bold">
          <i className="bi bi-kanban-fill me-2 text-custom-purple"></i>📋{" "}
          <span className="text-custom-purple">Your Task Dashboard</span>
        </h2>

        <p className="text-muted fs-5 fst-italic">
          <span className="me-2">✨</span>"Stay focused, stay determined – every
          small step counts toward success."<span className="ms-2">🚀</span>
        </p>
      </div>
      <div>
        <TaskCard tasks={tasks} />
      </div>
    </>
  );
};
