import React from "react";
import { Link } from "react-router-dom";

// first form

const Page1 = () => {
  return (
    <div className="text-center flex flex-col gap-10 w-2/4">
      <h1 className="text-3xl font-bold font-playfair-display">
        Tell us about your cycle
      </h1>
      <div className="flex flex-col gap-5">
        {options.map((data)=><label key={data.id} className="border border-brandPrimary rounded flex justify-between p-3 items-center">
          <span className="font-montserrat">{data?.title}</span>
          <input type="radio" className="" name="healthStatus" value={data?.value}/>
        </label>)}
      </div>
      <div>
        <Link to="/onboarding/page2" className=" btn bg-brandPrimary text-center px-40">Continue</Link>
      </div>
    </div>
  );
};

export default Page1;


// from options

const options = [
    {
        id: 1,
        title: "Do you have periods?",
        value: "periods"
    },
    {
        id: 2,
        title: "Are you in menopause?",
        value: "monopause"
    },
    {
        id: 3,
        title: "Are you on hormone therapy?",
        value: "hormoneTherapy"
    },
]
