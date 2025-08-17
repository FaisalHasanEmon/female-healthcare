import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//onboarding page4
const Page4 = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();

  // get selected values
  const handleOptions = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    // set selected value in useState and filter which are unselected
    setSelectedValues((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev?.filter((item) => item !== value);
      }
    });
  };

  // set concers in localstorage and navigate
  const setToLocalStorage = (event) => {
    event.preventDefault();
    localStorage.setItem("goals", JSON.stringify(selectedValues));
    navigate("/onboarding/page5");
  };

  //get item from localstorage
  useEffect(() => {
    let items = localStorage.getItem("goals");
    if (items) {
      setSelectedValues(JSON.parse(items));
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 items-center lg:gap-10">
      <h1 className="text-2xl lg:text-3xl font-playfair-display font-bold text-center ">
        What are your goals?
      </h1>
      <div className="flex flex-col gap-1 lg:gap-3 text-left  lg:w-[600px]">
        {/* maped option  */}
        {options.map((data) => (
          <label
            key={data.id}
            className="flex items-center gap-1.5 lg:gap-2 cursor-pointer"
          >
            <input
              onChange={handleOptions}
              checked={selectedValues?.includes(data?.value)}
              type="checkbox"
              name="healthStatus"
              value={data?.value}
              className="w-3 md:w-4 h-3 md:h-4 accent-brandPrimary"
            />
            <span className="font-montserrat text-sm md:text-base">
              {data?.title}
            </span>
          </label>
        ))}
      </div>
      {/* navigation link  */}
      <div className=" mt-5 flex justify-between items-center w-full">
        <button
          className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90] "
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="inline" /> Previous
        </button>
        <button
          className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90]"
          onClick={setToLocalStorage}
        >
          Continue <FaArrowRight className="inline" />
        </button>
      </div>
    </div>
  );
};

export default Page4;

//options for page4
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
  },
];
