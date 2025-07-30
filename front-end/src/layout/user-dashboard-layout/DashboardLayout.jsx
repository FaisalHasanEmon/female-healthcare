import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  // Drawer state management
  const [drawer, setDrawer] = useState(true);

  //   Drawer handler function
  const handleDrawer = () => {
    setDrawer(!drawer);
  };

  const NavButtonsStyle = {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    gap: "8px",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "8px",
  };

  // Navigate Links Buttons
  const navigateLinks = (
    <>
      {/* 1. Chatting Section */}
      <li>
        <NavLink
          to="/dashboard/new-session"
          className={({ isActive }) =>
            isActive ? "bg-brandSecondary" : "bg-brandPrimary"
          }
          style={NavButtonsStyle}
        >
          <figure>
            <img src="/dashboard-Icons/chat-icon.png" alt="Start New Session" />
          </figure>
          <p>Start New Session</p>
        </NavLink>
      </li>

      {/* 2. Mode Tracker */}
      <li>
        <NavLink
          to="/dashboard/mode-tracker"
          className={({ isActive }) =>
            isActive ? "bg-brandSecondary" : "bg-brandPrimary"
          }
          style={NavButtonsStyle}
        >
          <figure>
            <img
              src="/dashboard-Icons/tracker-icon.png"
              alt="Start New Session"
            />
          </figure>
          <p>Mode Tracker</p>
        </NavLink>
      </li>
      {/* 3. Settings */}
      <li>
        <div className="w-full flex bg-gradient-to-tr from-brandSecondary/30 via-brandPrimary to-brandSecondary/30">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? "bg-brandSecondary grow-1" : "bg-brandPrimary grow-1"
            }
            style={NavButtonsStyle}
          >
            <figure>
              <img
                src="/dashboard-Icons/settings-icon.png"
                alt="Start New Session"
              />
            </figure>
            <p>Settings</p>
          </NavLink>
          {/* Dropdown for logout */}
          <div className="dropdown dropdown-bottom  h-full my-auto  ">
            <div tabIndex={0} role="button">
              <figure className="">
                <img
                  src="/dashboard-Icons/dropdownIcon.png"
                  alt="dropdown icon"
                />
              </figure>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu  rounded-box z-1 w-28  p-1 shadow-sm -left-16 mt-4 bg-gradient-to-tr from-brandSecondary to-brandPrimary "
            >
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </>
  );

  return (
    <section className="w-full relative font-inter">
      <div className="flex h-screen relative overflow-hidden w-full">
        {/* Opened Drawer */}
        <div
          className={`transition-all duration-300 ease-in-out
          ${
            drawer
              ? "w-11/12 lg:w-2/12 opacity-100"
              : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="h-full mr-0 lg:mr-[13px]  bg-linear-to-t  from-brandSecondary to-brandPrimary"
            style={{ boxShadow: "4px 0 10px rgba(166, 194, 179, 1)" }}
          >
            {/* First Section for Logo and collapse and for options starts*/}
            <div className="h-1/2">
              {/* Logo and Collapse button Starts*/}
              <div className="flex justify-between items-center pl-2 pr-4 pt-2">
                <figure>
                  <img src="/logo3.png" alt="Logo" className="w-[80px]" />
                </figure>
                <div className="cursor-pointer" onClick={handleDrawer}>
                  <LuPanelLeftClose size={24} color="black" />
                </div>
              </div>
              {/* Logo and Collapse button Ends*/}
              {/* Links Sections Starts */}
              <ul className="w-11/12 lg:w-8/12 h-[200px]  mx-auto space-y-2.5 mt-10">
                {navigateLinks}
              </ul>
              {/* Links Sections Ends */}
            </div>
            {/* First Section for Logo and collapse and for options ends*/}
            {/* First Section for Logo and collapse and for options starts*/}
            <div className="h-1/2 w-full px-10">
              <div className="border"></div>
            </div>
            {/* First Section for Logo and collapse and for options ends*/}
          </div>
        </div>

        {/* Closed Drawer */}
        <div
          className={`transition-all duration-300 ease-in-out bg-brandPrimary pt-[30px]
          ${drawer ? "w-0 opacity-0 pointer-events-none" : "w-16 opacity-100"}`}
        >
          <div className="flex flex-col gap-8 justify-center items-center ">
            <div className="cursor-pointer" onClick={handleDrawer}>
              <LuPanelLeftOpen size={24} color="black" />
            </div>
            <div className="cursor-pointer">
              <NavLink to="/dashboard/new-session">
                <img
                  src="/dashboard-Icons/chat-icon.png"
                  className="flex justify-center items-center w-6 "
                  alt="Icon"
                />
              </NavLink>
            </div>
            <div className="cursor-pointer">
              <NavLink to="/dashboard/mode-tracker">
                <img
                  src="/dashboard-Icons/tracker-icon.png"
                  className="flex justify-center items-center w-6 "
                  alt="Icon"
                />
              </NavLink>
            </div>
            <div className="cursor-pointer">
              <NavLink to="/dashboard/settings">
                <img
                  src="/dashboard-Icons/settings-icon.png"
                  className="flex justify-center items-center w-6 "
                  alt="Icon"
                />
              </NavLink>
            </div>

            <div>
              <p>
                <FaPowerOff size={20}></FaPowerOff>
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div
          className={`transition-all duration-300 ease-in-out w-full overflow-y-scroll`}
        >
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
