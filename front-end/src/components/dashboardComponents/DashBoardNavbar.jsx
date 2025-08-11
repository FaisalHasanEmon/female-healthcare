import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { NavLink, useLocation } from "react-router-dom";

const DashBoardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <div className="fixed top-0 left-0 w-full z-45 flex justify-between items-center  bg-transparent backdrop-blur-3xl">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center ">
          <div className="text-brandPrimary" onClick={() => setIsOpen(!isOpen)}>
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

      {/* Drawer for mobile phone */}
      {isOpen && ( // Replace `true` with your condition
        <div className="drawer z-50">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
          />

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu text-base-content min-h-full w-80 p-4 bg-gradient-to-tr from-brandSecondary via-brandPrimary to-brandSecondary">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
              <li>
                <button
                  className="btn btn-error mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoardNavbar;
