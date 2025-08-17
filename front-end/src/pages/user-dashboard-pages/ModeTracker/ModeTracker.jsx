import React, { useState } from "react";

const ModeTracker = () => {
  const [selectedMood, setSelectedMood] = useState("");
  // const [selectedSymptom, setSelectedSymptom] = useState("");
  const [energyLevel, setEnergyLevel] = useState(5);
  const [log, setLog] = useState("symptoms");

  // New food log state
  const [foodLogData, setFoodLogData] = useState({
    alcohol: 0,
    caffeine: 0,
    cold: 0,
    commuting: 0,
    crowds: 0,
    family: 0,
    finances: 0,
    generalStress: 0,
  });
  // New symptomp log state
  const [symptompLogData, setSymptompLogData] = useState({
    fatigue: 0,
    mood: 0,
    sleep: 0,
    cravings: 0,
    weight: 0,
    cramps: 0,
    anxiety: 0,
    brainFog: 0,
    hotFlashes: 0,
    irregularCycles: 0,
  });

  const moodOptions = [
    { value: "happy", emoji: "😊", label: "Happy", color: "text-yellow-500" },
    { value: "sad", emoji: "😢", label: "Sad", color: "text-red-500" },
    { value: "love", emoji: "😍", label: "Love", color: "text-pink-500" },
    { value: "angry", emoji: "😠", label: "Angry", color: "text-red-600" },
    { value: "neutral", emoji: "😐", label: "Neutral", color: "text-gray-500" },
  ];

  // const symptomOptions = [
  //   "Fatigue",
  //   "Mood",
  //   "Sleep",
  //   "Cravings",
  //   "Weight",
  //   "Cramps",
  //   "Anxiety",
  //   "Brain fog",
  //   "Hot flashes",
  //   "Irregular cycles",
  // ];

  const foodLogItems = [
    { key: "alcohol", label: "Alcohol", icon: "🍷" },
    { key: "caffeine", label: "Caffeine", icon: "☕" },
    { key: "cold", label: "Cold", icon: "🌡️" },
    { key: "commuting", label: "Commuting", icon: "🚊" },
    { key: "crowds", label: "Crowds", icon: "👥" },
    { key: "family", label: "Family", icon: "🏠" },
    { key: "finances", label: "Finances", icon: "💰" },
    { key: "generalStress", label: "General Stress", icon: "🧠" },
  ];

  const symptompsLogItems = [
    { key: "fatigue", label: "Fatigue", icon: "😴" },
    { key: "mood", label: "Mood", icon: "😊" },
    { key: "sleep", label: "Sleep", icon: "🛌" },
    { key: "cravings", label: "Cravings", icon: "🍫" },
    { key: "weight", label: "Weight", icon: "⚖️" },
    { key: "cramps", label: "Cramps", icon: "🤕" },
    { key: "anxiety", label: "Anxiety", icon: "😟" },
    { key: "brainFog", label: "Brain Fog", icon: "🌫️" },
    { key: "hotFlashes", label: "Hot flashes", icon: "🔥" },
    { key: "irregularCycles", label: "Irregular Cycles", icon: "📅" },
  ];

  // const handleSymptomSelect = (symptom) => {
  //   setSelectedSymptom(symptom === selectedSymptom ? "" : symptom);
  // };

  const handleFoodLogChange = (key, value) => {
    setFoodLogData((prev) => ({
      ...prev,
      [key]: parseInt(value),
    }));
  };

  const handleSymptompLogChange = (key, value) => {
    setSymptompLogData((prev) => ({
      ...prev,
      [key]: parseInt(value),
    }));
  };

  const getSliderColor = (value) => {
    if (value === 0) return "range-brandSecondary";
    if (value <= 2) return "range-success";
    if (value <= 3) return "range-warning";
    return "range-error";
  };

  const getLevelText = (value) => {
    if (value === 0) return "NONE";
    if (value <= 1) return "LOW";
    if (value <= 2) return "MED";
    return "HIGH";
  };

  const handleSubmit = () => {
    const data = {
      mood: selectedMood,
      // symptom: selectedSymptom,
      energyLevel,
      symptompLog: symptompLogData,
      foodLog: foodLogData,
    };
    console.log("Wellness data:", data);
    alert("Wellness data submitted successfully!");
  };

  return (
    <div className="min-h-screen mt-14 container px-5 mx-auto">
      <div className="w-full sm:w-lg lg:w-2xl mx-auto flex flex-col justify-center items-center">
        {/* Wellness Tracker Section */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-[40px] font-bold text-gray-800 mb-2">
            AI Women Wellness Coach!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            Talk to your wellness companion. I'm here to help you with your
            wellness journey
          </p>
          <h2 className="text-lg sm:text-xl lg:text-4xl font-semibold text-gray-800 mb-2">
            Wellness Tracker
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Track your wellness journey, symptoms, and mood over time.
          </p>

          <div>
            <div className="space-y-6">
              {/* Mood Selection */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-[18px]">
                  Mood
                </h3>
                <div className="flex justify-between gap-2 sm:gap-4">
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

              {/* Symptoms Selection */}
              {/* <div>
                <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Symptoms
                </h3>
                <div className="dropdown dropdown-bottom w-full">
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
              </div> */}

              {/* Energy Level Slider */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-[18px]">
                  How Energetic Do You Feel Today?
                </h3>
                <div className="w-full">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="range range-primary w-full"
                    step="1"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1">
                    <span>0</span>
                    <span className="font-medium text-primary text-sm sm:text-base">
                      {energyLevel}
                    </span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              {/* Tab Section for Symptoms/Food Log */}
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-[18px]">
                  Log
                </h1>
                <div className="flex gap-4 sm:gap-6 lg:gap-8 mb-4">
                  <h3
                    onClick={() => setLog("symptoms")}
                    className={`font-medium text-gray-700 text-sm sm:text-base cursor-pointer transition-all ${
                      log === "symptoms"
                        ? "underline text-primary font-semibold"
                        : "hover:text-gray-900"
                    }`}
                  >
                    Symptoms
                  </h3>

                  <h3
                    onClick={() => setLog("trigger")}
                    className={`font-medium text-gray-700 text-sm sm:text-base cursor-pointer transition-all ${
                      log === "trigger"
                        ? "underline text-primary font-semibold"
                        : "hover:text-gray-900"
                    }`}
                  >
                    Food Log
                  </h3>
                </div>

                {/* Food Log Tab Content */}
                {log === "trigger" && (
                  <div className="space-y-4">
                    {foodLogItems.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm sm:text-base font-medium text-gray-700">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 max-w-xs ml-4">
                          <div className="flex-1">
                            <input
                              type="range"
                              min="0"
                              max="3"
                              value={foodLogData[item.key]}
                              onChange={(e) =>
                                handleFoodLogChange(item.key, e.target.value)
                              }
                              className={`range w-full ${getSliderColor(
                                foodLogData[item.key]
                              )}`}
                              step="1"
                            />
                          </div>
                          <div className="min-w-12 text-center">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                foodLogData[item.key] === 0
                                  ? "bg-gray-100 text-gray-600"
                                  : foodLogData[item.key] <= 1
                                  ? "bg-green-100 text-green-600"
                                  : foodLogData[item.key] <= 2
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {getLevelText(foodLogData[item.key])}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Symptoms Tab Content */}
                {log === "symptoms" && (
                  <div className="space-y-4">
                    {symptompsLogItems.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm sm:text-base font-medium text-gray-700">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 max-w-xs ml-4">
                          <div className="flex-1">
                            <input
                              type="range"
                              min="0"
                              max="3"
                              value={symptompLogData[item.key]}
                              onChange={(e) =>
                                handleSymptompLogChange(
                                  item.key,
                                  e.target.value
                                )
                              }
                              className={`range w-full ${getSliderColor(
                                symptompLogData[item.key]
                              )}`}
                              step="1"
                            />
                          </div>
                          <div className="min-w-12 text-center">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                symptompLogData[item.key] === 0
                                  ? "bg-gray-100 text-gray-600"
                                  : symptompLogData[item.key] <= 1
                                  ? "bg-green-100 text-green-600"
                                  : symptompLogData[item.key] <= 2
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {getLevelText(symptompLogData[item.key])}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
