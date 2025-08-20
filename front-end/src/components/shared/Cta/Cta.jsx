import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

const Cta = () => {
  return (
    <div className="bg-gradient-to-r from-[#f0f5ef] via-base-10 to-[#f0f5ef] py-16 px-5 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Ready to take control of your health?
      </h2>
      <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
        <PrimaryButton text="Get Started" link="#" />
        {/* <SecondaryButton text="Request Demo" link="#" /> */}
      </div>
    </div>
  );
};

export default Cta;
