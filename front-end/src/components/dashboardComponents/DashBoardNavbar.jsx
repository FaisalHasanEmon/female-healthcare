import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { NavLink, useLocation } from "react-router-dom";

const DashBoardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  let showPeroidTracker = false;
  console.log(location.pathname);

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
              onClick={() => setIsOpen(false)}
              end={
                location.pathname === `/dashboard/analytics` ||
                location.pathname === `/dashboard/overview`
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
            <ul className="space-y-3 text-base-content h-full w-80 p-4 bg-gradient-to-tr from-brandSecondary via-brandPrimary to-brandSecondary">
              <li className="mb-3">
                <div className="flex justify-between items-center pl-2 pr-4 pt-2">
                  <figure>
                    <img src="/logo3.png" alt="Logo" className="w-[60px]" />
                  </figure>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <LuPanelLeftClose size={24} color="black" />
                  </div>
                </div>
              </li>
              {navigateLinks}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoardNavbar;
