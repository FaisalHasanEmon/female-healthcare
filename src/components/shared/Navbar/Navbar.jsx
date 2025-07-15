import { NavLink } from "react-router-dom";

const Navbar = () => {
  const tabs = [
    { tab: "Home", path: "/" },
    { tab: "AI Chatbot", path: "/ai-chatbot" },
    { tab: "Blog", path: "/blog" },
    { tab: "Testimonials", path: "/testimonials" },
    { tab: "About", path: "/about" },
  ];
  return (
    <div className="flex justify-between items-center lg:mx-[60px]">
      <div className="flex justify-center items-center grow-0 gap-7">
        <figure className="w-[62px] h-[62px]">
          <img src="/logo.png" alt="Logo" className="w-full h-full" />
        </figure>

        <ul className="hidden lg:flex justify-center items-center gap-10 *:font-normal *:text-[20px]">
          {tabs?.map((tab, index) => (
            <li key={index}>
              <NavLink
                to={tab?.path}
                className={({ isActive }) =>
                  isActive
                    ? `relative text-black after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[16px] after:w-[calc(100%-6px)] after:ml-1  after:bg-[#D4E6C1] after:rounded-0 after:-z-50`
                    : "text-black"
                }
              >
                {tab?.tab}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* For Mobile and Tablet Hamburger Started*/}
        <div className="lg:hidden">
          <div className="dropdown dropdown-bottom dropdown-center">
            <div tabIndex={0} role="button" className="btn m-1">
              Click ⬇️
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {tabs?.map((tab, index) => (
                <li key={index}>
                  <NavLink
                    to={tab?.path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "text-[#A6C2B3] " : ""
                    }
                  >
                    {tab?.tab}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* For Mobile and Tablet Hamburger Ended*/}

        {/* For Desktop device Get started button Started*/}
        <div className="hidden lg:flex">
          <button className="font-semibold text-[20px] text-white px-[35px] py-[13px] rounded-[6px] bg-[#A6C2B3]">
            Get Started
          </button>
        </div>
        {/* For Desktop device Get started button Ended*/}
      </div>
    </div>
  );
};

export default Navbar;
