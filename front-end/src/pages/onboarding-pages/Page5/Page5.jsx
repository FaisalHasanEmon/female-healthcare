import React from "react";
import { Link } from "react-router-dom";

const Page5 = () => {
  return (
    <div className="text-center flex flex-col gap-10 w-3/4 md:h-2/4">
      <h1 className="text-2xl md:text-xl font-bold font-playfair-display">
        Would you like to set a daily reminder to check in with your body?
      </h1>
      <div className="flex flex-col gap-3 md:gap-5">
        <label className="border border-brandPrimary rounded flex justify-between p-1 text-sm md:text-base md:p-3 items-center">
          <span className="font-montserrat text-sm md:text-base">YES</span>
          <input type="radio" className="" name="healthStatus" value="yes" />
        </label>
        <label className="border border-brandPrimary rounded flex justify-between p-1 text-sm md:text-base md:p-3  items-center">
          <span className="font-montserrat text-sm md:text-base">No</span>
          <input type="radio" className="" name="healthStatus" value="no" />
        </label>
        <div className="text-left">
        <p className="font-semibold">Time</p>
          <select className="select select-sm md:select-md bg-brandPrimary">
            <option disabled selected>
              Select time
            </option>
            <option>9:00 A.M.</option>
            <option>12:00 P.M.</option>
            <option>4:00 P.M.</option>
          </select>
        </div>
        <div className="mr-auto">
          <Link to="/onboarding/page6" className=" btn bg-brandPrimary px-5 md:px-10 text-sm md:text-base hover:bg-[#7f9e90]">
            Finish up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page5;
