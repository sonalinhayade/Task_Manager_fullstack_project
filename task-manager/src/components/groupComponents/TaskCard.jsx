import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  deleteTasks,
  markAsComplete,
  updateTask,
} from "../../redux/Actions/TaskAction";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { TaskSchema } from "../../Services/schema";

export const TaskCard = ({ tasks: passedTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tasks: allTasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const tasks = passedTasks || allTasks;

  const handleEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    console.log("edit clicked");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // useState define karna - done
  // define function handleSubmit - done
  // define formik now

  return (
    <>
      {isModalOpen && selectedTask && (
        <div
          className="modal"
          style={{
            background: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Formik
            initialValues={{
              title: selectedTask.title || "",
              description: selectedTask.description || "",
              start_date: selectedTask.start_date
                ? selectedTask.start_date.slice(0, 10)
                : "",
              end_date: selectedTask.end_date
                ? selectedTask.end_date.slice(0, 10)
                : "",
              status: selectedTask.status || "",
              priority: selectedTask.priority || "",
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              dispatch(updateTask({ ...values, id: selectedTask.id })).then(
                () => {
                  setIsModalOpen(false);
                  setSelectedTask(null);
                }
              );
            }}
            validationSchema={TaskSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit} className="w-50">
                <div className="modal-header position-relative">
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    aria-label="Close"
                    style={{ top: "-15px", right: "-15px" }}
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="title"
                    className="form-control"
                    placeholder="Enter title"
                    id="title"
                    name="title"
                    autoComplete="off"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="title">Title</label>
                  {errors.title && touched.title && (
                    <div className="form-error-message">{errors.title}</div>
                  )}{" "}
                </div>

                <div className="form-floating mb-2">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Description"
                    id="description"
                    name="description"
                    autoComplete="off"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ height: "100px" }}
                  />
                  <label htmlFor="description">Description</label>
                  {errors.description && touched.description && (
                    <div className="form-error-message">
                      {errors.description}
                    </div>
                  )}{" "}
                </div>
                <div className="d-flex gap-3 mb-3">
                  <div className="form-floating w-50">
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      className="form-control"
                      value={values.start_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="start_date" className="form-label">
                      Start Date
                    </label>
                    {errors.start_date && touched.start_date && (
                      <div className="form-error-message">
                        {errors.start_date}
                      </div>
                    )}{" "}
                  </div>
                  <div className="form-floating w-50  ">
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      className="form-control"
                      value={values.end_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="end_date" className="form-label">
                      End Date
                    </label>
                    {errors.end_date && touched.end_date && (
                      <div className="form-error-message">
                        {errors.end_date}
                      </div>
                    )}{" "}
                  </div>
                </div>
                <div className="d-flex gap-3 mb-3">
                  <div className="form-floating w-50">
                    <select
                      className="form-control"
                      name="status"
                      id="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <label htmlFor="status">Status</label>
                    {errors.status && touched.status && (
                      <div className="form-error-message">{errors.status}</div>
                    )}{" "}
                  </div>
                  <div className="form-floating w-50">
                    <select
                      className="form-control"
                      name="priority"
                      id="priority"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <label htmlFor="priority">Priority</label>
                    {errors.priority && touched.priority && (
                      <div className="form-error-message">
                        {errors.priority}
                      </div>
                    )}{" "}
                  </div>
                </div>
                <button type="submit">Update Task</button>
              </form>
            )}
          </Formik>
        </div>
      )}
      <div className=" dashboard-container row row-cols-1 row-cols-md-3 g-4 pt-5">
        {tasks.map((task, index) => (
          <div key={index} className="col">
            <div
              className="card shadow-lg rounded-4 h-100 border-0"
              style={{ transition: "0.3s" }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title text-capitalize fw-bold text-dark mb-0">
                    {task.title}
                  </h5>
                  <span
                    className={`badge fs-6 px-3 py-2 ${
                      task.priority === "High"
                        ? "bg-danger"
                        : task.priority === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted mb-3">{task.description}</p>

                {/* Dates */}
                <div className="mb-4 d-flex justify-content-between">
                  <div>
                    <small className="text-muted fw-bold">Start Date</small>
                    <br />
                    <small className="text-secondary">
                      {task.start_date?.slice(0, 10)}
                    </small>
                  </div>

                  <div>
                    <small className="text-muted fw-bold">End Date</small>
                    <br />
                    <small className="text-secondary">
                      {task.end_date?.slice(0, 10)}
                    </small>
                  </div>
                </div>

                {/* Footer - Status + Conditional Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  {/* Status badge */}
                  <span
                    className={`badge fs-6 px-3 py-2 ${
                      task.status === "Completed"
                        ? "bg-success"
                        : task.status === "In Progress"
                        ? "bg-info text-dark"
                        : task.status === "Pending"
                        ? "bg-pending"
                        : ""
                    }`}
                  >
                    {task.status}
                  </span>

                  {/* Show buttons only if NOT completed */}
                  {task.status !== "Completed" && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm d-flex align-items-center gap-1 btn-outline-primary rounded-pill px-3 py-1 shadow-sm custom-btn-hover"
                        onClick={() => handleEditModal(task)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteTasks(task.id))}
                        className="btn btn-sm d-flex align-items-center gap-1 btn-outline-danger rounded-pill px-3 py-1 shadow-sm custom-btn-hover"
                      >
                        <i className="bi bi-trash3"></i> Delete
                      </button>
                      <button
                        onClick={() => dispatch(markAsComplete(task.id))}
                        className="btn btn-sm d-flex align-items-center gap-1 btn-outline-success rounded-pill px-3 py-1 shadow-sm custom-btn-hover"
                      >
                        <i className="bi bi-check-circle"></i> Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
