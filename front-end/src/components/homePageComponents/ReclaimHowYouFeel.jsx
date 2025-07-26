import React from "react";
import BoxHeading from "./shared/BoxHeading";

const ReclaimHowYouFeel = () => {
  return (
    <section>
      <div className="container mx-auto px-5 py-14">
        <div>
          <h2 className="text-[36px] font-bold text-center mb-10">
            Smart Health Reads for Real-Life Bodies
          </h2>
          <div className="mb-[83px] ">
            <BoxHeading text="How It Works" />
          </div>
          {/* cards */}
          <div className="flex flex-col justify-center items-center md:flex-row md:justify-center md:items-center md:space-x-4 space-y-4 md:space-y-0 p-4 ">
            {/* Step 1 */}
            <div className="p-3 border-2 border-brandPrimary shadow-brandPrimary shadow-2xl rounded-4xl w-[250px] h-[250px]  text-center flex flex-col justify-center items-center gap-3 ">
              <p className="font-semibold text-3xl text-textGray ">01</p>
              <div className="w-2/6 h-[2px] bg-brandPrimary"></div>
              <p className="text-2xl font-bold text-textGray">
                Log your symptoms & goals
              </p>
            </div>

            {/* Arrow */}
            <div className="p-3 flex items-center justify-center md:justify-start md:mt-0 mt-2 text-brandPrimary text-5xl font-semibold rotate-90 md:rotate-0">
              &rarr; {/* Unicode right arrow */}
            </div>
            {/* Step 2 */}
            <div className="border-2 border-brandPrimary shadow-brandPrimary shadow-2xl rounded-4xl w-[250px] h-[250px]  text-center flex flex-col justify-center items-center gap-3 ">
              <p className="font-semibold text-3xl text-textGray ">02</p>
              <div className="w-2/6 h-[2px] bg-brandPrimary"></div>
              <p className="text-2xl font-bold text-textGray">
                FENYX learns and guides you
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center md:justify-start md:mt-0 mt-2 text-brandPrimary text-5xl font-semibold rotate-90 md:rotate-0">
              &rarr; {/* Unicode right arrow */}
            </div>
            {/* Step 3 */}
            <div className="p-3 border-2 border-brandPrimary shadow-brandPrimary shadow-2xl rounded-4xl w-[250px] h-[250px]  text-center flex flex-col justify-center items-center gap-3 ">
              <p className="font-semibold text-3xl text-textGray ">03</p>
              <div className="w-2/6 h-[2px] bg-brandPrimary"></div>
              <p className="text-2xl font-bold text-textGray">
                Adjust your routine and daily insights
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ReclaimHowYouFeel;
