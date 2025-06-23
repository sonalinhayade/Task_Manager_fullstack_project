import { Outlet } from "react-router-dom";
import { SideBar } from "../src/components/groupComponents/SideBar";
import { Header } from "./components/groupComponents/Header";
import {ToastContainer} from "react-toastify"

function App() {
  return (
    <>
      <SideBar />
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
