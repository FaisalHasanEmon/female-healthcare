import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";


export default function OnBoardingNavbar() {
  const navigate = useNavigate();
  // navigating routes 
  const pages = [
    "/onboarding/page1",
    "/onboarding/page2",
    "/onboarding/page3",
    "/onboarding/page4",
    "/onboarding/page5",
    "/onboarding/page6",
    "/onboarding/last-page",
  ];
  // get route index from pages
  const currentIndex = pages.indexOf(location.pathname);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-transparent">
      <div className="container mx-auto px-5 flex justify-center items-center gap-[55px]">
        <figure className="w-[100px]">
          <img src="/logo.png" alt="Website logo" />
        </figure>
        <div className="flex justify-between items-center w-full ">
          {/* left arrow */}
          <div
            className="cursor-pointer hover:scale-1.5"
            onClick={() => navigate(pages[currentIndex - 1])}
            disabled={currentIndex === 0}
          >
            <FaArrowLeftLong className="text-brandPrimary text-2xl"></FaArrowLeftLong>
          </div>
          {/* right arrow */}
          <div className="cursor-pointer hover:scale-1.5">
            <button
              className="cursor-pointer"
              onClick={() => navigate(pages[currentIndex + 1])}
              disabled={currentIndex === pages.length - 1}
            >
              <FaArrowRightLong className="text-brandPrimary text-2xl"></FaArrowRightLong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
