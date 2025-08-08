import React from "react";
import { FaRegBell } from "react-icons/fa";
import { LuPanelLeftOpen } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const DashBoardNavbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  let showPeroidTracker = false;

  // Check if the current path is not the overview page
  if (
    location.pathname === "/dashboard/overview" ||
    location.pathname === "/dashboard/analytics" ||
    location.pathname === "/dashboard/" ||
    location.pathname === "/dashboard"
  ) {
    showPeroidTracker = true;
  } else {
    showPeroidTracker = false;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-45 flex justify-between items-center  bg-transparent backdrop-blur-3xl">
      <div className="container mx-auto px-5 py-3 flex justify-between items-center ">
        <div className="text-brandPrimary">
          <LuPanelLeftOpen size={28} className="md:hidden"></LuPanelLeftOpen>
        </div>
        <div className="flex items-center gap-5">
          <div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 border-2 border-brandPrimary rounded-[8px] text-black text-[16px] font-medium"
                hidden={showPeroidTracker ? false : true}
              >
                Period Tracker
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-brandPrimary">
            <FaRegBell size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
