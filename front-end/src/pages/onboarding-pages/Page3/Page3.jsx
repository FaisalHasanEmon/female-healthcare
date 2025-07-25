import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

// onboarding 3rd form

/*------------------------
coder: Md. Nafis IqbaL
email: nafisiqbal.net2002@gmail.com
Overview functionality of the page:

-- Here some input radio type field and a textarea field.
-- Get input value by different useState
-- textarea field by event.target.value 
-- set data in localStorage for better user exprience
-- get data from local storage and set to Alldata
-----------------------------*/

const Page3 = () => {
  //state to take select option
  const [dietary, setDietary] = useState("");
  const [activity, setActivity] = useState("");
  const [stress, setStress] = useState("");
  const [details, setDetails] = useState("");

  const navigate = useNavigate()

  // manage input value and set in local storage
  const handleSubmit = (event) => {
    const details = event.target.details.value;
    const lifestyle = {
      dietary,
      activity,
      stress,
      details,
    };
    localStorage.setItem("lifestyle", JSON.stringify(lifestyle));
    navigate("/onboarding/page4");
  };

  // get All data from localStorage and set to the hook
  useState(() => {
    const lifestyle = JSON.parse(localStorage.getItem("lifestyle"));
    if (lifestyle) {
      setDietary(lifestyle.dietary);
      setActivity(lifestyle.activity);
      setStress(lifestyle.stress);
      setDetails(lifestyle?.details);
    }
  }, []);

  return (
    <div className="mx-5">
      <h1 className="text-2xl font-bold text-center font-playfair-display mb-5">
        Tell us about your lifestyle
      </h1>
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <h3 className="font-semibold my-2 md:my-3">Dietary Style</h3>
          <div className="grid grid-cols-3 md:flex gap-3">
            {/* maped options dietary  */}
            {options.dietary.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-2 py-2  items-center ${
                  dietary === data.value ? "bg-brandPrimary" : "bg-transparent"
                }`}
              >
                <span className="font-montserrat text-sm md:text-base mx-auto ">
                  {data?.title}
                </span>
                <input
                  // sete value in state for dietary
                  onClick={(e) => setDietary(e.target.value)}
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
            {/* maped option activity  */}
            {options.activity.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center ${
                  activity === data.value ? "bg-brandPrimary" : "bg-transparent"
                }`}
              >
                <span className="font-montserrat text-sm md:text-base">
                  {data?.title}
                </span>
                <input
                  // set activity in state
                  onClick={(e) => setActivity(e.target.value)}
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
            {/* maped stress option */}
            {options.stress.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center ${
                  stress === data.value ? "bg-brandPrimary" : "bg-transparent"
                }`}
              >
                <span className="font-montserrat text-sm md:text-base">
                  {data?.title}
                </span>
                <input
                  // set value in state
                  onClick={(e) => setStress(e.target.value)}
                  type="radio"
                  className="hidden"
                  name="healthStatus"
                  value={data?.value}
                />
              </label>
            ))}
          </div>
        </div>
        {/* textarea  */}
        <textarea
          placeholder="Your Note..."
          name="details"
          defaultValue={details}
          className="textarea bg-brandPrimary mt-5"
        ></textarea>
        <div className="flex flex-col gap-8 mt-8">
          {/* navigation button  */}

          <button
            type="submit"
            className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded w-2/4 border-brandPrimary hover:bg-[#7f9e90]"
          >
            Continue
          </button>
        </div>
      </form>
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
