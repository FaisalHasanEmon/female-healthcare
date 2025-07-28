import { useState } from "react";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../Buttons/PrimaryButton";

const Navbar = () => {
  // Phone and Tablet Dropdown opener Uses state
  const [isOpen, setIsOpen] = useState(false);

  // Phone and Tablet Dropdown toggler function
  const toggleDropdown = () => setIsOpen(!isOpen);

  // All tabs and links
  const tabs = [
    { tab: "Home", path: "/" },
    { tab: "AI Chatbot", path: "/login" },
    { tab: "Fenyx Library", path: "/fenyx-library" },
    { tab: "Testimonials", path: "/testimonials" },
    { tab: "About", path: "/about" },
  ];
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-3xl ">
      <div className="container flex justify-between items-center mx-auto px-5 py-2">
        <div className="flex justify-center items-center grow-0 gap-7">
          {/* Brand logo started */}
          <figure className="w-[50px] h-[50px] md:w-[62px] md:h-[62px]">
            <img src="/logo.png" alt="Logo" className="w-full h-full" />
          </figure>
          {/* Brand logo ended */}
          {/* Tabs for Large device started */}
          <ul className="hidden md:flex justify-center items-center gap-10 *:font-normal *:text-[20px]">
            {tabs?.map((tab, index) => (
              <li key={index}>
                <NavLink
                  to={tab?.path}
                  className={({ isActive }) =>
                    isActive
                      ? `relative text-black after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[16px] after:w-[calc(100%-6px)] after:ml-1  after:bg-brandSecondary after:rounded-0 after:-z-50`
                      : "text-black"
                  }
                >
                  {tab?.tab}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Tabs for Large device ended */}
        </div>
        <div>
          {/* Phone and Tablet Menubar */}
          <div className="md:hidden relative inline-block">
            {/* Button */}
            <button
              onClick={toggleDropdown}
              className={`btn btn-circle swap swap-rotate transition-transform duration-300 ${
                isOpen ? "swap-active" : ""
              }`}
            >
              {/* Hamburger Icon */}
              <svg
                className="swap-off fill-current text-brandPrimary "
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* Cross Icon */}
              <svg
                className="swap-on fill-current text-brandPrimary"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <ul className="absolute right-3 mt-2  w-52 menu bg-base-100  rounded-box drop-shadow-brandPrimary shadow-2xl  y p-2 animate-fade-in ">
                {tabs?.map((tab, index) => (
                  <li key={index}>
                    <NavLink
                      to={tab?.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-brandPrimary "
                          : ""
                      }
                    >
                      {tab?.tab}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* For Mobile and Tablet Hamburger Ended*/}

          {/* For Desktop device Get started button Started*/}
          <div className="hidden lg:flex">
            <PrimaryButton text={"Start Your Reset"}></PrimaryButton>
          </div>
          {/* For Desktop device Get started button Ended*/}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
