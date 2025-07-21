import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OnBoardingNavbar() {
  const navigate = useNavigate();
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
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-brandPrimary"></FaArrowLeft>
          </div>
          {/* right arrow */}
          <div className="cursor-pointer hover:scale-1.5">
            <FaArrowRight className="text-brandPrimary"></FaArrowRight>
          </div>
        </div>
      </div>
    </nav>
  );
}
