import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Page5 = () => {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState("");

  // Handle radio button selection
  const handleReminderChange = (event) => {
    setReminder(event.target.value);
  };

  // Get data from form and set to localStorage
  const submitData = (event) => {
    event.preventDefault();
    
    try {
      localStorage.setItem("reminder", reminder);
      navigate("/onboarding/page6");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      // Still navigate even if localStorage fails
      navigate("/onboarding/page6");
    }
  };

  // Get reminder preference on initial loading
  useEffect(() => {
    try {
      const savedReminder = localStorage.getItem("reminder");
      if (savedReminder) {
        setReminder(savedReminder);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem("reminder");
    }
  }, []);

  return (
    <div className="text-center flex flex-col gap-10 w-3/4 md:h-2/4">
      {/* Title  */}
      <h1 className="text-2xl md:text-xl font-bold font-playfair-display">
        Would you like to set a daily reminder to check in with your body?
      </h1>
      <form className="flex flex-col mx-auto gap-3 md:gap-5 w-6/12">
        {/* Options  */}
        <label className="border border-brandPrimary rounded flex justify-between p-1 text-sm md:text-base md:p-3 items-center cursor-pointer">
          <span className="font-montserrat text-sm md:text-base ">YES</span>
          <input 
            type="radio" 
            name="healthStatus" 
            value="yes"
            checked={reminder === "yes"}
            onChange={handleReminderChange}
          />
        </label>
        <label className="border border-brandPrimary rounded flex justify-between p-1 text-sm md:text-base md:p-3  items-center cursor-pointer">
          <span className="font-montserrat text-sm md:text-base">No</span>
          <input 
            type="radio" 
            name="healthStatus" 
            value="no"
            checked={reminder === "no"}
            onChange={handleReminderChange}
          />
        </label>

        {/* Navigation  */}
        <div className=" mt-5 flex justify-between items-center w-full">
          <button
            type="button"
            className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90] "
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="inline" /> Previous
          </button>
          <button
            type="submit"
            className="btn btn-md bg-brandPrimary px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90]"
            onClick={submitData}
          >
            Finish up <FaArrowRight className="inline" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page5;
