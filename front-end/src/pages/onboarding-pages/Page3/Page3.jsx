import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

// onboarding 3rd form

const Page3 = () => {
    //state to take select option
    const [dietary, setDietary] = useState("");
    const [activity, setActivity] = useState("");
    const [stress, setStress] = useState("");
    const navigate = useNavigate();


    // manage input value and set in local storage
    const handleSubmit=(event)=>{
      const details = event.target.details.value;
      console.log(details);
      const lifestyle = {
        dietary,
        activity,
        stress,
        details
      }
      console.log(lifestyle);
      navigate("/onboarding/page4")
    }


  return (
    <div className="mx-5">
      <h1 className="text-2xl font-bold text-center font-playfair-display mb-5">
        Tell us about your lifestyle
      </h1>
      <Form className="">
        <div className="">
          <h3 className="font-semibold my-2 md:my-3">Dietary Style</h3>
          <div className="grid grid-cols-3 md:flex gap-3">
            {/* maped options dietary  */}
            {options.dietary.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-2 py-2  items-center ${dietary === data.value?"bg-brandPrimary" : "bg-transparent"}` }
              >
                <span className="font-montserrat text-sm md:text-base mx-auto ">{data?.title}</span>
                <input
                  // sete value in state for dietary
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
            {/* maped option activity  */}
            {options.activity.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center ${activity === data.value?"bg-brandPrimary" : "bg-transparent"}` }
              >
                <span className="font-montserrat text-sm md:text-base">{data?.title}</span>
                <input
                // set activity in state 
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
            {/* maped stress option */}
            {options.stress.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center ${stress === data.value?"bg-brandPrimary" : "bg-transparent"}` }
              >
                <span className="font-montserrat text-sm md:text-base">{data?.title}</span>
                <input
                // set value in state 
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
        {/* textarea  */}
        <div className="flex flex-col gap-8 mt-8">
          <textarea
            placeholder="Your Note..."
            name="details"
            className="textarea bg-brandPrimary"
          ></textarea>
          {/* navigation button  */}
          <div className="">
            <button type="submit"
              onClick={handleSubmit}
              className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded w-2/4 border-brandPrimary hover:bg-[#7f9e90]"
            >Continue</button>
          </div>
        </div>
      </Form>
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
