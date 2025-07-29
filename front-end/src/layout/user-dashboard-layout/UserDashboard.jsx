import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
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
            <img
              src="/userDashboard-Icons/chat-icon.png"
              alt="Start New Session"
            />
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
              src="/userDashboard-Icons/tracker-icon.png"
              alt="Start New Session"
            />
          </figure>
          <p>Mode Tracker</p>
        </NavLink>
      </li>
      {/* 3. Settings */}
      <li>
        <div>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? "bg-brandSecondary" : "bg-brandPrimary"
            }
            style={NavButtonsStyle}
          >
            <figure>
              <img
                src="/userDashboard-Icons/settings-icon.png"
                alt="Start New Session"
              />
            </figure>
            <p>Settings</p>
          </NavLink>
        </div>
      </li>
    </>
  );

  return (
    <section className="h-screen w-full relative">
      <div className="h-full flex  relative overflow-hidden w-full">
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
                  <LuPanelLeftClose size={24} color="gray" />
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
          className={`transition-all duration-300 ease-in-out bg-brandPrimary 
          ${drawer ? "w-0 opacity-0 pointer-events-none" : "w-16 opacity-100"}`}
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="cursor-pointer" onClick={handleDrawer}>
              <LuPanelLeftOpen size={24} />
            </div>
            <div>Logo</div>
          </div>
        </div>

        {/* Right Content */}
        <div
          className={`transition-all duration-300 ease-in-out w-full bg-amber-300`}
        >
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
