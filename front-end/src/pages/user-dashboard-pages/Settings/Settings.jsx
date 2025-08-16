import React, { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    // Profile Info
    name: "",
    age: "",
    email: "",
    password: "",
    // location: "",

    // Hormonal Info & Cycle Settings
    regularCycle: true,
    currentPhase: "Luteal",
    cycleLength: 28,
    periodLength: 5,
    birthControlHRT: false,
    hasUterus: true,

    // Lifestyle & Preferences
    dietaryStyles: [],
    activityLevel: "Moderate",
    stressLevel: "Medium",
    medications: "",

    // Top Three Concerns
    topThreeConcerns: [],

    // Daily Reminders
    dailyReminder: false,
    reminderTime: "09:00",

    // AI Insights Settings - Updated defaults
    showFENYXInsights: true, // Default to true
    symptomTrackingDepth: "Basic", // Default to "Basic"
  });

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for showFENYXInsights toggle
    if (name === "showFENYXInsights") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleDietaryStyleChange = (style) => {
    setFormData((prev) => ({
      ...prev,
      dietaryStyles: prev.dietaryStyles.includes(style)
        ? prev.dietaryStyles.filter((s) => s !== style)
        : [...prev.dietaryStyles, style],
    }));
    console.log("Selected dietary style:", style);
    // console.log("Updated dietary styles:", formData.dietaryStyles);
  };

  const handleTopThreeConcernsChange = (concern) => {
    setFormData((prev) => {
      const currentConcerns = prev.topThreeConcerns;

      if (currentConcerns.includes(concern)) {
        // Remove concern if already selected
        return {
          ...prev,
          topThreeConcerns: currentConcerns.filter((c) => c !== concern),
        };
      } else if (currentConcerns.length < 3) {
        // Add concern if less than 3 selected
        return {
          ...prev,
          topThreeConcerns: [...currentConcerns, concern],
        };
      } else {
        // Show toast if trying to select more than 3
        showToast("You can only select up to 3 concerns");
        return prev;
      }
    });
  };

  const handleUpdateInfo = () => {
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    // const location = formData.location;
    const user_info = { name, email, password };
    console.log("Update Profile Api ", user_info);
    showToast("Profile information updated successfully!");
  };

  const handleChangePassword = () => {
    showToast("Password change initiated. Check your email!");
  };

  // const handleRecalculateCycle = () => {
  //   showToast("Cycle recalculated based on recent data!");
  // };

  // const handleSaveReminderPreferences = () => {
  //   showToast("Reminder preferences saved!");
  // };

  const handleExportData = (format) => {
    showToast(`Data export (${format}) started. Download will begin shortly.`);
  };

  const handleClearSymptoms = () => {
    if (
      confirm(
        "Are you sure you want to clear all logged symptoms? This action cannot be undone."
      )
    ) {
      showToast("Symptoms cleared and dashboard reset!");
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
      )
    ) {
      showToast(
        "Account deletion initiated. You will receive a confirmation email."
      );
    }
  };

  const handleSaveAllChanges = () => {
    // Collect data from Hormonal Info & Cycle Settings to Lifestyle & Preferences sections
    const allSectionsData = {
      // Hormonal Info & Cycle Settings
      hormonalInfo: {
        regularCycle: formData.regularCycle,
        currentPhase: formData.currentPhase,
        cycleLength: formData.cycleLength,
        periodLength: formData.periodLength,
        birthControlHRT: formData.birthControlHRT,
        hasUterus: formData.hasUterus,
      },

      // Top Three Concerns
      topThreeConcerns: formData.topThreeConcerns,

      // Daily Reminders
      dailyReminders: {
        dailyReminder: formData.dailyReminder,
        reminderTime: formData.reminderTime,
      },

      // AI Insights Settings
      aiInsights: {
        showFENYXInsights: formData.showFENYXInsights,
      },

      // Lifestyle & Preferences
      lifestylePreferences: {
        dietaryStyles: formData.dietaryStyles,
        activityLevel: formData.activityLevel,
        stressLevel: formData.stressLevel,
        medications: formData.medications,
      },
    };

    console.log("All Sections Data for API:", allSectionsData);
    showToast("All changes saved successfully!");
  };

  const handleSaveLifestylePreferences = () => {
    const lifestyleData = {
      dietaryStyles: formData.dietaryStyles,
      activityLevel: formData.activityLevel,
      stressLevel: formData.stressLevel,
      medications: formData.medications,
    };
    console.log("Lifestyle & Preferences API data:", lifestyleData);
    showToast("Lifestyle preferences saved successfully!");
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push(time);
    }
  }
  // Dietary styles options
  const dietaryStyle = [
    { id: 1, text: "Vegan" },
    { id: 2, text: "Vegetarian" },
    { id: 3, text: "Pescatarian" },
    { id: 4, text: "Paleo" },
    { id: 5, text: "Keto" },
    { id: 6, text: "Mediterranean" },
    { id: 7, text: "Gluten-Free" },
    { id: 8, text: "None" },
  ];

  // Top Three Concerns options
  const concernsOptions = [
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-22">
      {/* Toast Notification */}
      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success text-white">
            <span>{toast}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Section 1: Profile Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Profile Info</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name..."
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Your Age..."
                    value={formData.age}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email..."
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* <input
                  type="text"
                  name="location"
                  placeholder="Location (optional)..."
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                /> */}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleUpdateInfo}
                    className="btn bg-brandPrimary text-white"
                  >
                    Update Info
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="btn btn-outline hover:text-white hover:bg-brandPrimary text-brandPrimary border-brandSecondary"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Hormonal Info & Cycle Settings */}
            <div className=" rounded-lg ">
              <h2 className="text-2xl font-semibold mb-6">
                Hormonal Info & Cycle Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Do you have a regular cycle?
                  </span>
                  <input
                    type="checkbox"
                    name="regularCycle"
                    checked={formData.regularCycle}
                    onChange={handleInputChange}
                    className="toggle toggle-success"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current hormonal phase
                    </label>
                    <select
                      name="currentPhase"
                      value={formData.currentPhase}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                    >
                      <option value="Menstrual">Menstrual</option>
                      <option value="Follicular">Follicular</option>
                      <option value="Ovulatory">Ovulatory</option>
                      <option value="Luteal">Luteal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cycle length (days)
                    </label>
                    <input
                      type="number"
                      name="cycleLength"
                      value={formData.cycleLength}
                      onChange={handleInputChange}
                      min="21"
                      max="35"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Period length (days)
                  </label>
                  <input
                    type="number"
                    name="periodLength"
                    value={formData.periodLength}
                    onChange={handleInputChange}
                    min="3"
                    max="8"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Currently on birth control or HRT?
                  </span>
                  <input
                    type="checkbox"
                    name="birthControlHRT"
                    checked={formData.birthControlHRT}
                    onChange={handleInputChange}
                    className="toggle toggle-success"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Has uterus / had oophorectomy?
                  </span>
                  <input
                    type="checkbox"
                    name="hasUterus"
                    checked={formData.hasUterus}
                    onChange={handleInputChange}
                    className="toggle toggle-success"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Your Top Three Concerns */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Your Top Three Concerns
              </h2>

              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Select up to 3 concerns that are most important to you (
                  {formData.topThreeConcerns.length}/3 selected)
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {concernsOptions.map((concern) => (
                    <label
                      key={concern}
                      className={`flex items-center space-x-3 cursor-pointer ${
                        formData.topThreeConcerns.length >= 3 &&
                        !formData.topThreeConcerns.includes(concern)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.topThreeConcerns.includes(concern)}
                        onChange={() => handleTopThreeConcernsChange(concern)}
                        disabled={
                          formData.topThreeConcerns.length >= 3 &&
                          !formData.topThreeConcerns.includes(concern)
                        }
                        className="checkbox checkbox-success"
                      />
                      <span>{concern}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Daily Reminders */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Daily Reminders</h2>

              <div className="space-y-4">
                <p className="font-medium">
                  Would you like to receive a daily check-in reminder?
                </p>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="dailyReminder"
                      value={true}
                      checked={formData.dailyReminder === true}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dailyReminder: true,
                        }))
                      }
                      className="radio radio-success"
                    />
                    <span>Yes</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="dailyReminder"
                      value={false}
                      checked={formData.dailyReminder === false}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dailyReminder: false,
                        }))
                      }
                      className="radio radio-success"
                    />
                    <span>No</span>
                  </label>
                </div>

                {formData.dailyReminder && (
                  <div className="ml-6 mt-4">
                    <label className="block text-sm font-medium mb-2">
                      Choose reminder time:
                    </label>
                    <select
                      name="reminderTime"
                      value={formData.reminderTime}
                      onChange={handleInputChange}
                      className="select select-bordered w-full max-w-xs"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Section 5: AI Insights Settings */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                AI Insights Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Show personalized FENYX insights on dashboard
                  </span>
                  <input
                    type="checkbox"
                    name="showFENYXInsights"
                    checked={formData.showFENYXInsights}
                    onChange={handleInputChange}
                    className="toggle toggle-success"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Section 3: Lifestyle & Preferences */}
            <div className="">
              <h2 className="text-2xl font-semibold mb-6">
                Lifestyle & Preferences
              </h2>

              {/* Dietary Style */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Dietary Style (Multi-select)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryStyle?.map((diet) => (
                    <label
                      key={diet?.id}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        checked={formData.dietaryStyles.includes(diet?.id)}
                        onChange={() => handleDietaryStyleChange(diet?.id)}
                        className="checkbox checkbox-success"
                      />
                      <span>{diet?.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activity Level */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Activity Level</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Low</span>
                  <span className="text-sm">Moderate</span>
                  <span className="text-sm">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="activityLevel"
                      value="Low"
                      checked={formData.activityLevel === "Low"}
                      onChange={handleInputChange}
                      className="radio radio-success"
                    />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="activityLevel"
                      value="Moderate"
                      checked={formData.activityLevel === "Moderate"}
                      onChange={handleInputChange}
                      className="radio radio-success"
                    />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="activityLevel"
                      value="High"
                      checked={formData.activityLevel === "High"}
                      onChange={handleInputChange}
                      className="radio radio-success"
                    />
                  </label>
                </div>
              </div>

              {/* Stress Level */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Stress Level</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Low</span>
                  <span className="text-sm">Medium</span>
                  <span className="text-sm">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stressLevel"
                      value="Low"
                      checked={formData.stressLevel === "Low"}
                      onChange={handleInputChange}
                      className="radio radio-success"
                    />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stressLevel"
                      value="Medium"
                      checked={formData.stressLevel === "Medium"}
                      onChange={handleInputChange}
                      className="radio radio-success"
                    />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stressLevel"
                      value="High"
                      checked={formData.stressLevel === "High"}
                      onChange={handleInputChange}
                      className="radio radio-success"
                    />
                  </label>
                </div>
              </div>

              {/* Medications/Supplements */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Medications/Supplements
                </h3>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  placeholder="List your current medications and supplements..."
                />
              </div>
            </div>

            {/* Section 6: Data Control & Privacy */}
            <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Data Control & Privacy
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleExportData("CSV")}
                    className="btn btn-outline text-[12px] md:text-sm"
                  >
                    Export data (CSV)
                  </button>
                  <button
                    onClick={() => handleExportData("PDF")}
                    className="btn btn-outline text-[12px] md:text-sm"
                  >
                    Export data (PDF)
                  </button>
                </div>

                <button
                  onClick={handleClearSymptoms}
                  className="btn bg-brandSecondary w-full text-[12px] md:text-sm"
                >
                  Clear logged symptoms and reset dashboard
                </button>

                <div className="space-y-2">
                  <a href="#" className="text-blue-600 hover:underline block">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-blue-600 hover:underline block">
                    Terms of Use
                  </a>
                </div>

                <button
                  onClick={handleDeleteAccount}
                  className="btn btn-error w-full text-white text-[12px] md:text-sm"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSaveAllChanges}
            className="btn bg-brandPrimary btn-lg text-white px-12"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
