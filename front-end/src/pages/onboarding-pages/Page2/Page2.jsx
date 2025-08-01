import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//----------------------------- form options data for page2--------------------------

const options = [
  {
    id: 1,
    title: "Fatiuge",
    value: "Fatiuge",
  },
  {
    id: 2,
    title: "Mood",
    value: "Mood",
  },
  {
    id: 3,
    title: "Sleep",
    value: "Sleep",
  },
  {
    id: 4,
    title: "Cravings",
    value: "Cravings",
  },
  {
    id: 5,
    title: "Weight",
    value: "Weight",
  },
  {
    id: 6,
    title: "Cramps",
    value: "Cramps",
  },
  {
    id: 7,
    title: "Anxiety",
    value: "Anxiety",
  },
  {
    id: 8,
    title: "Brain fog",
    value: "Brain fog",
  },
  {
    id: 9,
    title: "Hot flashes",
    value: "Hot flashes",
  },
  {
    id: 10,
    title: "Irregular cycles",
    value: "Irregular cycles",
  },
];

//onboarding second form
const Page2 = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();

  // get selected values
  const handleOptions = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    // set selected value in useState and filter which are unselected
    setSelectedValues((prev) => {
      if (checked) {
        if (prev?.length >= 3) {
          return prev;
        }
        return [...prev, value];
      } else {
        return prev?.filter((item) => item !== value);
      }
    });
  };

  // set concers in localstorage and navigate
  const setToLocalStorage = (event) => {
    event.preventDefault();
    localStorage.setItem("concerns", JSON.stringify(selectedValues));
    navigate("/onboarding/page3");
  };

  //get item from localstorage
  useEffect(() => {
    let items = localStorage.getItem("concerns");
    if(items){
      setSelectedValues(JSON.parse(items));
    }
  }, []);

  // rander ui
  return (
    <div className="flex flex-col gap-5 mx-10 md:mx-0 md:gap-10">
      {/* page2 title  */}
      <h1 className="text-2xl md:text-3xl font-playfair-display font-bold text-center md:mx-20">
        What are your top 3 concerns right now?
      </h1>
      <div className="flex flex-col gap-1 md:gap-3">
        {/* mapped form option  */}
        {options?.map((data, index) => (
          <label
            key={index}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              onChange={handleOptions}
              checked={selectedValues?.includes(data.value)}
              type="checkbox"
              name="healthStatus"
              value={data?.value}
              className=" w-3 h-3 text-sm md:text-base md:w-4 md:h-4 accent-brandPrimary"
            />
            <span className="font-montserrat">{data?.title}</span>
          </label>
        ))}
      </div>
      <div className="text-right">
        <button className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90]" onClick={setToLocalStorage}>Continue</button>
      </div>
    </div>
  );
};

export default Page2;


