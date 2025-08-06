import { Outlet } from "react-router-dom";
import DashboardSideBar from "../../components/dashboardComponents/DashboardSideBar";

const DashboardLayout = () => {
  return (
    <section className="w-full relative font-inter">
      <div className="flex h-screen relative overflow-hidden w-full">
        {/*1. Left Side Content */}
        <DashboardSideBar />

        {/* 2. Right Side Content */}
        <div
          className={`transition-all duration-300 ease-in-out w-full overflow-y-scroll`}
        >
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
