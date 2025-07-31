import React from "react";
import OnBoardingNavbar from "../../components/shared/OnBoardingNavbar/OnBoardingNavbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const OnBoardingLayout = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-hidden bg-[rgba(217, 233, 192, 0.2)] ">
      <ScrollToTop />
      <OnBoardingNavbar className="mx-auto"></OnBoardingNavbar>
      <div className="flex justify-center items-center h-screen">
        <Outlet />
      </div>
      {/* Image top */}
      <figure className="absolute right-0 top-0 -z-10  mr-5">
        <img
          src="/onboarding-images/top-right.png"
          className="w-[150px] md:w-[300px]"
          alt=""
        />
      </figure>
      {/* Image bottom right */}
      <figure className="absolute bottom-0 -z-10 right-0">
        <img
          src="/onboarding-images/bottom-right.png"
          className="w-[229px] md:w-[629px]"
          alt="Right Bottom Background Image"
        />
      </figure>
      {/* Image bottom left */}
      <figure className="absolute left-0 -z-10  bottom-0">
        <img
          src="/onboarding-images/left-bottom.png"
          alt="Left Bottom Background Image"
          className="h-[170px] md:h-[570px]"
        />
      </figure>
      {/* blob1   bottom left*/}
      <div className="bg-[#D4E6C14D] md:h-[456px] md:w-[610px] absolute rounded-[68%_32%_65%_35%_/_64%_31%_69%_36%] md:-left-[194px] md:top-[136px] blur-[200px]"></div>
      {/* blob2  bottom left*/}
      <div className="bg-[#D4E6C14D] md:h-[912px] md:w-[868px] absolute rounded-[50%_50%_32%_68%_/_52%_43%_57%_48%] md:-left-[356px] md:top-[427px] blur-[200px] rotate-[132deg] "></div>
      {/* blob3  top right*/}
      <div className="bg-[#D4E6C14D] md:h-[913px] md:w-[868px] absolute rounded-[62%_38%_15%_85%_/_52%_49%_51%_48%] md:-right-[200px] md:-top-[299px] blur-[200px]  rotate-[353deg] "></div>
    </div>
  );
};

export default OnBoardingLayout;
