import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
      value: "dairy free",
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

// onboarding 3rd form
const Page3 = () => {
  // State to take select options
  const [dietary, setDietary] = useState("");
  const [activity, setActivity] = useState("");
  const [stress, setStress] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validation - check if required fields are filled
    if (!dietary || !activity || !stress) {
      setError("Please select all required fields");
      return;
    }

    const formData = new FormData(event.target);
    const detailsValue = formData.get("details") || "";
    
    const lifestyle = {
      dietary,
      activity,
      stress,
      details: detailsValue,
    };
    
    try {
      localStorage.setItem("lifestyle", JSON.stringify(lifestyle));
      navigate("/onboarding/page4");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setError("Failed to save data. Please try again.");
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    // Save current selections before navigating back
    const lifestyle = {
      dietary,
      activity,
      stress,
      details,
    };
    localStorage.setItem("lifestyle", JSON.stringify(lifestyle));
    navigate("/onboarding/page2");
  };

  // Handle textarea change
  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  // Clear error when user makes selections
  const handleDietaryChange = (value) => {
    setDietary(value);
    setError("");
  };

  const handleActivityChange = (value) => {
    setActivity(value);
    setError("");
  };

  const handleStressChange = (value) => {
    setStress(value);
    setError("");
  };

  // Get data from localStorage on component mount
  useEffect(() => {
    try {
      const lifestyle = localStorage.getItem("lifestyle");
      if (lifestyle) {
        const parsedLifestyle = JSON.parse(lifestyle);
        setDietary(parsedLifestyle.dietary || "");
        setActivity(parsedLifestyle.activity || "");
        setStress(parsedLifestyle.stress || "");
        setDetails(parsedLifestyle.details || "");
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  return (
    <div className="mx-5">
      <h1 className="text-2xl font-bold text-center font-playfair-display mb-5">
        Tell us about your lifestyle
      </h1>
      
      <form onSubmit={handleSubmit} className="">
        {/* Dietary Style Section */}
        <div className="">
          <h3 className="font-semibold lg:my-3">
            Dietary Style <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-3 md:flex gap-3">
            {options.dietary.map((data) => (
              <label
                key={data.id}
                className={`border border-brandPrimary rounded flex justify-between px-2 py-2 items-center cursor-pointer transition-colors ${
                  dietary === data.value ? "bg-brandPrimary text-white" : "bg-transparent"
                }`}
              >
                <span className="font-montserrat text-sm md:text-base mx-auto">
                  {data.title}
                </span>
                <input
                  onChange={(e) => handleDietaryChange(e.target.value)}
                  checked={dietary === data.value}
                  type="radio"
                  className="hidden"
                  name="dietary"
                  value={data.value}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-20 lg:gap-0 lg:flex-col">
          {/* Activity Level Section */}
          <div>
            <h3 className="font-semibold my-2 lg:my-3">
              Activity Level <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              {options.activity.map((data) => (
                <label
                  key={data.id}
                  className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center cursor-pointer transition-colors ${
                    activity === data.value
                      ? "bg-brandPrimary text-white"
                      : "bg-transparent"
                  }`}
                >
                  <span className="font-montserrat text-sm lg:text-base">
                    {data.title}
                  </span>
                  <input
                    onChange={(e) => handleActivityChange(e.target.value)}
                    checked={activity === data.value}
                    type="radio"
                    className="hidden"
                    name="activity"
                    value={data.value}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Stress Level Section */}
          <div>
            <h3 className="font-semibold my-2 lg:my-3">
              Stress Level <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              {options.stress.map((data) => (
                <label
                  key={data.id}
                  className={`border border-brandPrimary rounded flex justify-between px-3 py-2 items-center cursor-pointer transition-colors ${
                    stress === data.value ? "bg-brandPrimary text-white" : "bg-transparent"
                  }`}
                >
                  <span className="font-montserrat text-sm lg:text-base">
                    {data.title}
                  </span>
                  <input
                    onChange={(e) => handleStressChange(e.target.value)}
                    checked={stress === data.value}
                    type="radio"
                    className="hidden"
                    name="stress"
                    value={data.value}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="mt-5">
          <h3 className="font-semibold mb-2">Additional Details (Optional)</h3>
          <textarea
            placeholder="Tell us more about your lifestyle, health goals, or any specific concerns..."
            name="details"
            value={details}
            onChange={handleDetailsChange}
            className="w-full p-3 border border-brandPrimary rounded min-h-[100px] resize-y"
            rows="4"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-3">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-5">
          <button
            type="button"
            className="btn btn-md bg-brandPrimary text-white px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90] transition-colors"
            onClick={handlePrevious}
          >
            <FaArrowLeft className="inline mr-2" /> Previous
          </button>
          <button
            type="submit"
            className="btn btn-md bg-brandPrimary text-white px-5 md:px-10 py-2 rounded border-brandPrimary hover:bg-[#7f9e90] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!dietary || !activity || !stress}
          >
            Continue <FaArrowRight className="inline ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page3;