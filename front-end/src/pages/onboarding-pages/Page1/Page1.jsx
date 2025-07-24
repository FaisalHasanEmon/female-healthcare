import React from "react";
import { Link } from "react-router-dom";

// first form

const Page1 = () => {
  return (
    <div className="text-center flex flex-col gap-10 w-3/4">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair-display">
        Tell us about your cycle
      </h1>
      <div className="flex flex-col gap-3 md:gap-5">
        {options.map((data) => (
          <label
            key={data.id}
            className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center"
          >
            <span className="font-montserrat ">{data?.title}</span>
            <input
              type="radio"
              className=""
              name="healthStatus"
              value={data?.value}
            />
          </label>
        ))}
      </div>

      <Link
        to="/onboarding/page2"
        className=" btn bg-brandPrimary text-center px-5 md:px-40 hover:bg-[#7f9e90]"
      >
        Continue
      </Link>
    </div>
  );
};

export default Page1;

// from options

const options = [
  {
    id: 1,
    title: "Do you have periods?",
    value: "periods",
  },
  {
    id: 2,
    title: "Are you in menopause?",
    value: "monopause",
  },
  {
    id: 3,
    title: "Are you on hormone therapy?",
    value: "hormoneTherapy",
  },
];
