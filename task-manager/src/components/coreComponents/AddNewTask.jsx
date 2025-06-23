import React from "react";
import { useFormik } from "formik";
import { TaskSchema } from "../../Services/schema";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/Actions/TaskAction";

const initialValues = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  status: "",
  priority: "",
};

export const AddNewTask = () => {
  const dispatch = useDispatch();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: TaskSchema,
      onSubmit: (values, action) => {
        dispatch(createTask(values));
        console.log("🚀 ~ AddNewTask.jsx:17 ~ AddNewTask ~ values:", values);
        action.resetForm();
      },
    });

  return (
    <>
      <div className="task-page-header mb-4 text-center">
        <h2
          className="fw-bold"
          style={{
            color: "#4169E1",
          }}
        >
          Create New Task
        </h2>
        <p className="fs-5 text-muted fst-italic">
          <span>Add details to plan and track your work effectively.</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
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
            <div className="form-error-message">{errors.description}</div>
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
              <div className="form-error-message">{errors.start_date}</div>
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
              <div className="form-error-message">{errors.end_date}</div>
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
              <div className="form-error-message">{errors.priority}</div>
            )}{" "}
          </div>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </>
  );
};
