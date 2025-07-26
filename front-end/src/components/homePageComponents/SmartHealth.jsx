import React from "react";
import BoxHeading from "./shared/BoxHeading";
import Marquee from "react-fast-marquee";

const SmartHealth = () => {
  return (
    <section>
      <div className="container mx-auto px-5 py-14 mt-10">
        {/* Box heading and Title Starts */}
        <div className="text-center space-y-[61px]">
          <div>
            <div
              className={`flex w-[200px] justify-start  items-center gap-5 mx-auto  py-[7px] px-[14px] border-2 border-brandPrimary rounded-[6px]`}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-brandSecondary"></div>
              <p className="text-[20px]">FENYX Library</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold">
            Smarter Heath Starts Here Subheading
          </h2>
        </div>
        {/* Box heading and Title Ends */}
        <div></div>
      </div>
    </section>
  );
};

export default SmartHealth;
