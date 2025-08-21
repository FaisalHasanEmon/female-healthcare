import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// first form
const Page1 = () => {
  const [period, setPeriod] = useState(false);
  const [cycle, setCycle] = useState({}); // Fixed: removed 'let'
  const navigate = useNavigate();

  // get cycle
  useEffect(() => {
    const getCycle = localStorage.getItem("cycle");
    if (getCycle && getCycle !== "{}") {
      const parsedCycle = JSON.parse(getCycle);
      setCycle(parsedCycle);
      // Set period state based on loaded data
      setPeriod(parsedCycle.isPeriod || false);
    }
  }, []);

  // set cycle in localstorage
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Get the current cycle state (which was set by radio button changes)
    let finalCycle = { ...cycle };
    
    // If periods is selected, add the date
    if (cycle.isPeriod && period) {
      const dateInput = event.target.querySelector('input[name="date"]');
      if (dateInput && dateInput.value) {
        finalCycle.period = { date: dateInput.value };
      }
    }

    // set data in localStorage
    if (Object.keys(finalCycle).length > 0) {
      localStorage.setItem("cycle", JSON.stringify(finalCycle));
      console.log("Data saved to localStorage:", finalCycle); // Debug log
      navigate("/onboarding/page2");
    } else {
      alert("Please select an option before continuing.");
    }
  };

  // Fixed: handle radio button change separately from form submission
  const handleRadioChange = (value) => {
    setPeriod(value === "periods");
    
    // Update cycle state immediately to show visual feedback
    let newCycle = {};
    if (value === "periods") {
      newCycle = {
        isPeriod: true,
        isMenopause: false,
        ishormoneTherapy: false,
      };
    } else if (value === "menopause") {
      newCycle = {
        isPeriod: false,
        isMenopause: true,
        ishormoneTherapy: false,
      };
    } else if (value === "hormoneTherapy") {
      newCycle = {
        isPeriod: false,
        isMenopause: false,
        ishormoneTherapy: true,
      };
    }
    setCycle(newCycle);
  };

  // render ui
  return (
    <div className="text-center flex flex-col gap-10 w-9/12 lg:w-6/12">
      <h1 className="text-2xl lg:text-3xl font-bold font-playfair-display">
        Tell us about your cycle
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-5"> {/* Fixed: use onSubmit instead of onChange */}
        <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 lg:p-3 items-center cursor-pointer">
          <span className="font-montserrat">Do you have periods?</span>
          <div className="relative">
            <input
              onChange={() => handleRadioChange("periods")}
              type="radio"
              name="healthStatus"
              value="periods"
              checked={cycle.isPeriod || false}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 ${cycle.isPeriod ? 'border-brandPrimary bg-brandPrimary' : 'border-gray-300 bg-white'} flex items-center justify-center`}>
              {cycle.isPeriod && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
        </label>
        <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 lg:p-3 items-center cursor-pointer">
          <span className="font-montserrat">Are you in menopause?</span>
          <div className="relative">
            <input
              onChange={() => handleRadioChange("menopause")}
              type="radio"
              name="healthStatus"
              value="menopause"
              checked={cycle.isMenopause || false}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 ${cycle.isMenopause ? 'border-brandPrimary bg-brandPrimary' : 'border-gray-300 bg-white'} flex items-center justify-center`}>
              {cycle.isMenopause && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
        </label>
        <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 lg:p-3 items-center cursor-pointer">
          <span className="font-montserrat">Are you on hormone therapy?</span>
          <div className="relative">
            <input
              onChange={() => handleRadioChange("hormoneTherapy")}
              type="radio"
              name="healthStatus"
              value="hormoneTherapy"
              checked={cycle.ishormoneTherapy || false}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 ${cycle.ishormoneTherapy ? 'border-brandPrimary bg-brandPrimary' : 'border-gray-300 bg-white'} flex items-center justify-center`}>
              {cycle.ishormoneTherapy && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
        </label>
        {period && (
          <div className="flex flex-col gap-3 lg:gap-5">
            <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 lg:p-3 items-center">
              <span className="font-montserrat">Last period start date</span>
              <input
                type="date"
                name="date" // Fixed: added name attribute
                required
                className="input input-sm outline-1 cursor-pointer px-1 outline-brandPrimary rounded-sm"
              />
            </label>
          </div>
        )}
        <div>
          <button
            type="submit"
            className="btn bg-brandPrimary text-center px-5 lg:px-40 hover:bg-[#7f9e90]"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page1;

//--------------------- from options data for page1-----------------------------

// const options = [
//   {
//     id: 1,
//     title: "Do you have periods?",
//     value: "periods",
//   },
//   {
//     id: 2,
//     title: "Are you in menopause?",
//     value: "menopause",
//   },
//   {
//     id: 3,
//     title: "Are you on hormone therapy?",
//     value: "hormoneTherapy",
//   },
// ];
