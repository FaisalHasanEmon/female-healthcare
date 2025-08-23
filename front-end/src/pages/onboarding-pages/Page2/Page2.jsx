import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//----------------------------- form options data for page2--------------------------

const options = [
  {
    id: 1,
    title: "Fatigue", // Fixed typo: "Fatiuge" -> "Fatigue"
    value: "Fatigue",
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
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // get selected values
  const handleOptions = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    
    setSelectedValues((prev) => {
      if (checked) {
        // Check if trying to select more than 3 items
        if (prev.length >= 3) {
          setError(true);
          return prev;
        }
        setError(false);
        return [...prev, value];
      } else {
        // Remove unchecked item and clear error
        setError(false);
        return prev.filter((item) => item !== value);
      }
    });
  };

  // set concerns in localStorage and navigate
  const setToLocalStorage = (event) => {
    event.preventDefault();
    
    // Validate that at least one option is selected
    if (selectedValues.length === 0) {
      setError(true);
      return;
    }
    
    localStorage.setItem("concerns", JSON.stringify(selectedValues));
    navigate("/onboarding/page3");
  };

  // Handle previous button click
  const handlePrevious = () => {
    // Save current selections before navigating back
    localStorage.setItem("concerns", JSON.stringify(selectedValues));
    navigate("/onboarding/page1"); // Navigate to specific previous page
  };

  // get item from localStorage
  useEffect(() => {
    const items = localStorage.getItem("concerns");
    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        setSelectedValues(parsedItems);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setSelectedValues([]);
      }
    }
  }, []);

  // render ui
  return (
    <div className="flex flex-col gap-5 mx-10 md:mx-0 lg:gap-10">
      {/* page2 title */}
      <h1 className="text-2xl lg:text-3xl font-playfair-display font-bold text-center md:mx-20">
        What are your top 3 concerns right now?
      </h1>
      
      <div className="flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-col gap-1 lg:gap-3">
        {/* mapped form options */}
        {options.map((data) => (
          <label key={data.id} className="flex items-center gap-2 cursor-pointer">
            <input
              onChange={handleOptions}
              checked={selectedValues.includes(data.value)}
              type="checkbox"
              name="healthStatus"
              value={data.value}
              className="w-3 h-3 text-sm md:text-base md:w-4 md:h-4 accent-brandPrimary"
            />
            <span className="font-montserrat">{data.title}</span>
          </label>
        ))}
        
        {/* Error message */}
        {error && (
          <p className="text-red-700 font-semibold">
            {selectedValues.length === 0 
              ? "Please select at least one concern"
              : "You can select max 3 options"
            }
          </p>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90] text-white"
          onClick={handlePrevious}
        >
          <FaArrowLeft className="inline mr-2" /> Previous
        </button>
        
        <button
          type="button"
          className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={setToLocalStorage}
          disabled={selectedValues.length === 0}
        >
          Continue <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Page2;
