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

  // Calendar component data - replace with your backend data
  const calendarData = {
    phaseInsights:
      "Your cycle patterns show consistent ovulation timing around day 14-15. Energy levels tend to be highest during the follicular phase.",
    suggestions:
      "Consider tracking your mood and energy levels alongside your cycle. Light exercise during menstruation can help reduce cramping.",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const selectedMonth = new Date(); // Current month
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const today = new Date();
    const isCurrentMonth =
      selectedMonth.getMonth() === today.getMonth() &&
      selectedMonth.getFullYear() === today.getFullYear();

    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() - 1
    );
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${daysInPrevMonth - i}`}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 text-xs sm:text-sm"
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();

      days.push(
        <div
          key={day}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        >
          <span
            className={`text-xs sm:text-sm ${
              isToday
                ? "bg-blue-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-medium"
                : "text-gray-700"
            }`}
          >
            {day}
          </span>
        </div>
      );
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 text-xs sm:text-sm"
        >
          {day}
        </div>
      );
    }

    return days;
  };

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
                  className="btn m-1 border-2 border-brandPrimary rounded-[8px] text-black text-sm sm:text-[16px] font-medium px-2 sm:px-4"
                  hidden={showPeroidTracker ? false : true}
                >
                  Period Tracker
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content bg-base-100 rounded-2xl  border-white shadow-brandPrimary shadow-lg w-64 sm:w-80 md:w-96 lg:w-80 xl:w-96 p-3 sm:p-4 mt-2 z-10"
                >
                  {/* Calendar Header */}
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <h3 className="text-gray-800 font-medium text-base sm:text-lg">
                      {monthNames[new Date().getMonth()]}{" "}
                      {new Date().getFullYear()}
                    </h3>
                  </div>

                  {/* Calendar Grid */}
                  <div className="mb-3 sm:mb-4">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div
                          key={day}
                          className="w-8 h-6 sm:w-10 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                      {renderCalendar()}
                    </div>
                  </div>

                  {/* Phase Insights Section */}
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-semibold text-blue-800 mb-1 sm:mb-2">
                      Phase Insights
                    </h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      {calendarData.phaseInsights}
                    </p>
                  </div>

                  {/* Suggestions Section */}
                  <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-semibold text-green-800 mb-1 sm:mb-2">
                      Suggestions
                    </h4>
                    <p className="text-xs text-green-700 leading-relaxed">
                      {calendarData.suggestions}
                    </p>
                  </div>
                </div>
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
