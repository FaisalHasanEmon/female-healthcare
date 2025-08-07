import React from "react";
import { FaRegBell } from "react-icons/fa";

const DashBoardNavbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div></div>
      <div className="flex items-center gap-5">
        <div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 border-2 border-brandPrimary rounded-[8px] text-black text-[16px] font-medium"
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
        <FaRegBell size={34} />
      </div>
    </div>
  );
};

export default DashBoardNavbar;
