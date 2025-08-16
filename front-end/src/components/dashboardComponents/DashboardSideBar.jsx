import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { NavLink, useLocation } from "react-router-dom";

const DashboardSideBar = () => {
  // Drawer state management
  const [drawer, setDrawer] = useState(true);
  const location = useLocation();
  console.log(location.pathname);

  //   Drawer handler function
  const handleDrawer = () => {
    setDrawer(!drawer);
  };

  const NavButtonsStyle = {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0px 8px 8px",
  };
  // Navigation links configuration
  const navLinks = [
    {
      id: 0,
      name: "Dashboard",
      path: "/dashboard/analytics",
      icon: "/dashboard-Icons/chat-icon.png",
    },
    {
      id: 1,
      name: "Start New Session",
      path: "/dashboard/new-session",
      icon: "/dashboard-Icons/chat-icon.png",
    },
    {
      id: 2,
      name: "Mode Tracker",
      path: "/dashboard/mode-tracker",
      icon: "/dashboard-Icons/tracker-icon.png",
    },
    {
      id: 3,
      name: "Settings",
      path: "/dashboard/settings",
      icon: "/dashboard-Icons/settings-icon.png",
      option: [{ id: 1, name: "Logout" }],
    },
  ];

  // Navigation links rendering
  const navigateLinks = (
    <>
      {navLinks.map((link) => (
        <li key={link?.id}>
          <div className="w-full flex bg-gradient-to-tr from-brandSecondary/30 via-brandPrimary to-brandSecondary/30">
            <NavLink
              to={link?.path}
              className={({ isActive }) =>
                isActive ? "bg-brandSecondary grow-1" : "bg-brandPrimary grow-1"
              }
              style={NavButtonsStyle}
              end={
                location.pathname === `/dashboard/overview` ||
                location.pathname === `/dashboard/analytics`
                  ? false
                  : true
              }
            >
              <figure>
                <img src={link?.icon} alt="Start New Session" />
              </figure>
              <p>{link?.name}</p>
            </NavLink>
            {/* Dropdown for logout */}
            {link?.option && link?.option.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </li>
      ))}
    </>
  );
  return (
    <>
      {/* Opened Drawer For Tab and Desktop devices */}
      <div
        className={`hidden md:block md:transition-all md:duration-300 md:ease-in-out z-50
          ${
            drawer
              ? "w-11/12 md:w-4/12 lg:w-2/12 opacity-100"
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
            <ul className="w-11/12 lg:w-10/12 h-[200px]  mx-auto space-y-2.5 mt-10">
              {navigateLinks}
            </ul>
            {/* Links Sections Ends */}
          </div>
          {/* First Section for Logo and collapse and for options ends*/}
          {/* First section bottom part starts*/}
          <div className="h-1/2 w-full px-10">
            {/* <div className="border"></div> */}
          </div>
          {/* First section bottom part ends*/}
        </div>
      </div>

      {/* Closed Drawer For Tab and Desktop devices */}
      <div
        className={`hidden z-50 md:block md:transition-all md:duration-300 md:ease-in-out md:bg-brandPrimary md:pt-[30px] md:h-screen 
          ${
            drawer ? "w-0 opacity-0 pointer-events-none" : "w-16 md:opacity-100"
          }`}
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
    </>
  );
};

export default DashboardSideBar;
