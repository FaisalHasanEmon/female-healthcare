import React from "react";
import { Link } from "react-router-dom";

const Page5 = () => {
  return (
    <div className="text-center flex flex-col gap-10 w-2/4">
      <h1 className="text-xl font-bold font-playfair-display">
        Would you like to set a daily reminder to check in with your body?
      </h1>
      <div className="flex flex-col gap-5">
        <label className="border border-brandPrimary rounded flex justify-between p-3 items-center">
          <span className="font-montserrat">YES</span>
          <input type="radio" className="" name="healthStatus" value="yes" />
        </label>
        <label className="border border-brandPrimary rounded flex justify-between p-3 items-center">
          <span className="font-montserrat">No</span>
          <input type="radio" className="" name="healthStatus" value="no" />
        </label>
        <div className="text-left">
        <p className="font-semibold">Time</p>
          <select className="select bg-brandPrimary">
            <option disabled selected>
              Select time
            </option>
            <option>Light mode</option>
            <option>Dark mode</option>
            <option>System</option>
          </select>
        </div>
        <div className="mr-auto">
          <Link to="/onboarding/page6" className=" btn bg-brandPrimary px-10">
            Finish up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page5;
