import React from 'react';
import { Link } from 'react-router-dom';


//onboarding page4
const Page4 = () => {
    return (
        <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-playfair-display font-bold text-center ">
        What are your goals?
      </h1>
      <div className="flex flex-col gap-3 text-left w-[600px]">
        {options.map((data) => (
          <label
            key={data.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name="healthStatus"
              value={data?.value}
              className="w-4 h-4 accent-brandPrimary"
            />
            <span className="font-montserrat">{data?.title}</span>
          </label>
        ))}
      </div>
      <div className="text-right">
        <Link to="/onboarding/page5" className="btn btn-md bg-brandPrimary px-10 py-2 rounded border-brandPrimary">
          Continue
        </Link>
      </div>
    </div>
    );
};

export default Page4;

//options
const options = [
  {
    id: 1,
    title: "Balance hormones",
    value: "Balance hormones",
  },
  {
    id: 2,
    title: "Track my cycle",
    value: "Track my cycle",
  },
  {
    id: 3,
    title: "Improve mood",
    value: "Improve mood",
  },
  {
    id: 4,
    title: "Boost energy",
    value: "Boost energy",
  },
  {
    id: 5,
    title: "Reduce cravings",
    value: "Reduce cravings",
  },
  {
    id: 6,
    title: "Support weight changes",
    value: "Support weight changes",
  },
  {
    id: 7,
    title: "Feel more in control",
    value: "Feel more in control",
  },
  {
    id: 8,
    title: "Learn what’s happening in my body",
    value: "Learn what’s happening in my body",
  },
  {
    id: 9,
    title: "Other",
    value: "Other",
  }
];
