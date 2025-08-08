import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="container mx-auto px-5 min-h-screen relative">
      <div className="">
        <div className="flex justify-between items-center mt-24 lg:w-10/12 w-full">
          <h1 className="text-[32px] font-bold">Dashboard</h1>

          <p className="p-2.5  rounded-[6px] bg-brandPrimary text-[16px] font-medium text-black">
            Last 7 days
          </p>
        </div>
        <div className="flex gap-2.5 mt-7.5 text-[16px] font-medium">
          <NavLink
            className={({ isActive }) => (isActive ? "underline" : "")}
            to="/dashboard/overview"
          >
            Overview
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "underline" : "")}
            to="/dashboard/analytics"
          >
            Analytics
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
