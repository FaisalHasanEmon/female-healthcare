import { Outlet } from "react-router-dom";
import DashboardSideBar from "../../components/dashboardComponents/DashboardSideBar";
import DashBoardNavbar from "../../components/dashboardComponents/DashBoardNavbar";

const DashboardLayout = () => {
  return (
    <section className="w-full relative font-inter">
      <div className="flex h-screen relative overflow-hidden w-full">
        {/*1. Left Side Content */}
        <DashboardSideBar />

        {/* 2. Right Side Content */}
        <div
          className={`transition-all duration-300 ease-in-out w-full overflow-y-scroll `}
        >
          <div className="max-w-6xl mx-auto px-5 relative">
            <DashBoardNavbar />
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
