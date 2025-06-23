import React from "react";
import { TaskCard } from "../groupComponents/TaskCard";
import { useSelector } from "react-redux";

export const CompletedTask = () => {
  const {tasks}= useSelector((state)=>state.task);

  const completedTasks = tasks.filter((tasks) => tasks.status === "Completed");


  return (
    <>
      <div className="text-center my-4 ">
        <h2 className="fw-bold text-success ">✅ Completed Tasks</h2>
        <p className="fs-5 text-muted">
          Great job!{" "}
          <span role="img" aria-label="clap">👏</span> Now breathe{" "}
          <span role="img" aria-label="breath">😌</span>, smile{" "}
          <span role="img" aria-label="smile">😊</span>, and get ready for the next win{" "}
          <span role="img" aria-label="trophy">🏆</span>.
        </p>
      </div>

      <TaskCard  tasks = {completedTasks}/>
    </>
  );
};
