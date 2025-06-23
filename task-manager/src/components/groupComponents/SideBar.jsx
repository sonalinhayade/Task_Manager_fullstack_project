import "../../assets/style/component.css";
import { Link } from "react-router-dom";
import { FaHome, FaCheckCircle, FaClock, FaTasks, FaPlus, FaChartBar } from "react-icons/fa";

export const SideBar = () => {
  return (
    <>
    <div className="sidebar">
      <h1 className="sidebar-title">VictoryBoard</h1>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">
          <FaHome className="sidebar-icon" /> Dashboard
        </Link>
        <Link to="/completed-tasks" className="sidebar-link">
          <FaCheckCircle className="sidebar-icon" /> Completed Tasks
        </Link>
        <Link to="/pending-tasks" className="sidebar-link">
          <FaClock className="sidebar-icon" /> Pending Tasks
        </Link>
        <Link to="/in-progress-tasks" className="sidebar-link">
          <FaTasks className="sidebar-icon" /> In Progress
        </Link>
        <Link to="/add-new-task" className="sidebar-link">
          <FaPlus className="sidebar-icon" /> Add New Task
        </Link>
        {/* <Link to="/task-status" className="sidebar-link">
          <FaChartBar className="sidebar-icon" /> Task Status
        </Link> */}
      </nav>
    </div>
    </>
  );
};
