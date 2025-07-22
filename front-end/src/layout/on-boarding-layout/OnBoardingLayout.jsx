import React from "react";
import OnBoardingNavbar from "../../components/shared/OnBoardingNavbar/OnBoardingNavbar";

const OnBoardingLayout = () => {
  return (
    <div className="relative min-h-screen">
      <OnBoardingNavbar className="mx-auto"></OnBoardingNavbar>
      {/* Image top */}
      <figure className="absolute right-0 top-0  mr-5">
        <img
          src="/onboarding-images/top-right.png"
          className="w-[300px]"
          alt=""
        />
      </figure>
      {/* Image bottom right */}
      <figure className="absolute bottom-0 right-0">
        <img
          src="/onboarding-images/bottom-right.png"
          className="w-[629px]"
          alt="Right Bottom Background Image"
        />
      </figure>
      {/* Image bottom left */}
      <figure className="absolute left-0 bottom-0">
        <img
          src="/onboarding-images/left-bottom.png"
          alt="Left Bottom Background Image"
          className="h-[570px]"
        />
      </figure>
    </div>
  );
};

export default OnBoardingLayout;
