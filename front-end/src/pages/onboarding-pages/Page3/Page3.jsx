import React, { useState } from "react";
import { Link } from "react-router-dom";

// onboarding 3rd form

const Page3 = () => {
    //get selected form
    const [dietary, setDietary] = useState("")
    const [activity, setActivity] = useState("")
    const [stress, setStress] = useState("")




  return (
    <div className="mx-5">
      <h1 className="text-2xl font-bold text-center font-playfair-display mb-5">
        Tell us about your lifestyle
      </h1>
      <div className="">
        <div className="">
          <h3 className="font-semibold my-2 md:my-3">Dietary Style</h3>
          <div className="grid grid-cols-3 md:flex gap-3">
            {options.dietary.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-2 py-2  items-center ${dietary === data.value?"bg-brandPrimary" : "bg-transparent"}` }
              >
                <span className="font-montserrat text-sm md:text-base mx-auto ">{data?.title}</span>
                <input
                  onClick={(e)=>setDietary(e.target.value)}
                  type="radio"
                  className="hidden "
                  name="healthStatus"
                  
                  value={data?.value}
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold my-3">Activity Level</h3>
          <div className="flex gap-3">
            {options.activity.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center ${activity === data.value?"bg-brandPrimary" : "bg-transparent"}` }
              >
                <span className="font-montserrat text-sm md:text-base">{data?.title}</span>
                <input
                onClick={(e)=>setActivity(e.target.value)}
                  type="radio"
                  className="hidden"
                  name="healthStatus"
                  value={data?.value}
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold my-3">Stress Level</h3>
          <div className="flex gap-3">
            {options.stress.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center ${stress === data.value?"bg-brandPrimary" : "bg-transparent"}` }
              >
                <span className="font-montserrat text-sm md:text-base">{data?.title}</span>
                <input
                 onClick={(e)=>setStress(e.target.value)}
                  type="radio"
                  className="hidden"
                  name="healthStatus"
                  value={data?.value}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-8">
          <textarea
            placeholder="Your Note..."
            className="textarea bg-brandPrimary"
          ></textarea>
          <div className="">
            <Link
              to="/onboarding/page4"
              className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded w-2/4 border-brandPrimary hover:bg-[#7f9e90]"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;


//form options
const options = {
  dietary: [
    {
      id: 1,
      title: "Vegan",
      value: "vegan",
    },
    {
      id: 2,
      title: "Pescatarian",
      value: "pescatarian",
    },
    {
      id: 3,
      title: "Vegetarian",
      value: "vegetarian",
    },
    {
      id: 4,
      title: "Omnivore",
      value: "omnivore",
    },
    {
      id: 5,
      title: "Paleo",
      value: "paleo",
    },
    {
      id: 6,
      title: "Gluten-Free",
      value: "gluten free",
    },
    {
      id: 7,
      title: "Dairy-Free",
      value: "dairy free ",
    },
  ],
  activity: [
    {
      id: 1,
      title: "Low",
      value: "low",
    },
    {
      id: 2,
      title: "Moderate",
      value: "moderate",
    },
    {
      id: 3,
      title: "High",
      value: "high",
    },
  ],
  stress: [
    {
      id: 1,
      title: "Low",
      value: "low",
    },
    {
      id: 2,
      title: "Moderate",
      value: "moderate",
    },
    {
      id: 3,
      title: "High",
      value: "high",
    },
  ],
};
