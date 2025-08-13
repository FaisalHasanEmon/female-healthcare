import React, { useState } from "react";

const ModeTracker = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [energyLevel, setEnergyLevel] = useState(5);
  const [foodLog, setFoodLog] = useState("");

  const moodOptions = [
    { value: "happy", emoji: "😊", label: "Happy", color: "text-yellow-500" },
    { value: "sad", emoji: "😢", label: "Sad", color: "text-red-500" },
    { value: "love", emoji: "😍", label: "Love", color: "text-pink-500" },
    { value: "angry", emoji: "😠", label: "Angry", color: "text-red-600" },
    { value: "neutral", emoji: "😐", label: "Neutral", color: "text-gray-500" },
  ];

  const symptomOptions = [
    "Fatigue",
    "Mood",
    "Sleep",
    "Cravings",
    "Weight",
    "Cramps",
    "Anxiety",
    "Brain fog",
    "Hot flashes",
    "Irregular cycles",
  ];

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom === selectedSymptom ? "" : symptom);
  };

  const handleSubmit = () => {
    const data = {
      mood: selectedMood,
      symptom: selectedSymptom,
      energyLevel,
      foodLog,
    };
    console.log("Wellness data:", data);
    // Here you would typically send the data to your backend
    alert("Wellness data submitted successfully!");
  };

  return (
    <div className="min-h-screen mt-14">
      <div className="container mx-auto px-5 ">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 ">
            AI Women Wellness Coach!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl ">
            Talk to your wellness companion. I'm here to help you with your
            wellness journey
          </p>
        </div>

        {/* Wellness Tracker Section */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Wellness Tracker
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Track your wellness journey, symptoms, and mood over time.
          </p>

          {/* Mood Selection */}
          <div className="mb-6 sm:mb-8">
            <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              Mood
            </h3>
            <div className="flex justify-between  gap-2 sm:gap-4 max-w-lg lg:max-w-xl">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg transition-all hover:bg-gray-50"
                >
                  <span
                    className={`mb-1 transition-all duration-200 ${
                      selectedMood === mood.value
                        ? "text-3xl sm:text-4xl"
                        : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {mood.emoji}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-medium ${mood.color}`}
                  >
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            {/* Left Column */}
            <div className="space-y-6">
              {/* Symptoms Selection */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Symptoms
                </h3>
                <div className="dropdown dropdown-bottom w-full sm:w-lg lg:w-xl">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-outline w-full justify-between text-sm sm:text-base"
                  >
                    {selectedSymptom || "Select a symptom"}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow-lg border max-h-60 overflow-y-auto"
                  >
                    {symptomOptions.map((symptom) => (
                      <li key={symptom}>
                        <button
                          className={`flex items-center justify-between text-sm sm:text-base ${
                            selectedSymptom === symptom
                              ? "bg-primary text-white"
                              : ""
                          }`}
                          onClick={() => handleSymptomSelect(symptom)}
                        >
                          <span>{symptom}</span>
                          {selectedSymptom === symptom && (
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Energy Level Slider */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  How Energetic Do You Feel Today?
                </h3>
                <div className="w-full sm:w-lg lg:w-xl">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="range range-primary w-full"
                    step="1"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1">
                    <span>1</span>
                    <span className="font-medium text-primary text-sm sm:text-base">
                      {energyLevel}
                    </span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Food Log */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Food Log
                </h3>
                <textarea
                  className="textarea textarea-bordered w-full sm:w-lg lg:w-xl h-32 sm:h-40 lg:h-48 resize-none text-sm sm:text-base"
                  placeholder="Log your meals, snacks, and beverages today..."
                  value={foodLog}
                  onChange={(e) => setFoodLog(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 sm:mt-8">
            <button
              onClick={handleSubmit}
              className="btn btn-primary w-full sm:w-auto sm:min-w-32 text-sm sm:text-base"
              disabled={!selectedMood}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeTracker;
