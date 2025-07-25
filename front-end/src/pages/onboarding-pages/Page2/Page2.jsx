import React from "react";
import { Link } from "react-router-dom";

//onboarding second form
const Page2 = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-playfair-display font-bold text-center mx-20">
        What are your top 3 concerns right now?
      </h1>
      <div className="flex flex-col gap-3">
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
        <Link to="/onboarding/page3" className="btn btn-md bg-brandPrimary px-10 py-2 rounded border-brandPrimary">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Page2;

// form options

const options = [
  {
    id: 1,
    title: "Fatiuge",
    value: "fatiuge",
  },
  {
    id: 2,
    title: "Mode",
    value: "mode",
  },
  {
    id: 3,
    title: "Sleep",
    value: "sleep",
  },
  {
    id: 4,
    title: "Cravings",
    value: "cravings",
  },
  {
    id: 5,
    title: "Weight",
    value: "weight",
  },
  {
    id: 6,
    title: "Cramps",
    value: "cramps",
  },
  {
    id: 7,
    title: "Anxiety",
    value: "anxiety",
  },
  {
    id: 8,
    title: "Brain fog",
    value: "brain fog",
  },
  {
    id: 9,
    title: "Hot flashes",
    value: "hot flashes",
  },
  {
    id: 10,
    title: "Irregular cycles",
    value: "irregular cycles",
  },
];
