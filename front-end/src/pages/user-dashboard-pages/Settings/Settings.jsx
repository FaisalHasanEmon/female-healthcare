import React, { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    // Profile Info
    name: "",
    age: "",
    email: "",
    password: "",
    location: "",
    profilePhoto: null, // Add profile photo to state

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

    // Daily Reminders
    dailyReminder: false,
    reminderTime: "09:00",

    // AI Insights Settings - Updated defaults
    showFENYXInsights: true, // Default to true
    symptomTrackingDepth: "Basic", // Default to "Basic"

    // Auto-save enabled
    autoSave: true,
  });

  const [toast, setToast] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for showFENYXInsights toggle
    if (name === "showFENYXInsights") {
      const newDepth = checked ? "Basic" : "";
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        // Set symptomTrackingDepth to empty string when toggle is off, "Basic" when on
        symptomTrackingDepth: newDepth,
      }));
      console.log("symptomTrackingDepth:", newDepth);
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      // Log the correct value for symptomTrackingDepth
      if (name === "symptomTrackingDepth") {
        console.log("symptomTrackingDepth:", newValue);
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showToast("Please select a valid image file!");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size should be less than 5MB!");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);

      // Update form data
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));

      showToast("Profile photo uploaded successfully!");
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: null,
    }));
    setProfileImagePreview(null);
    showToast("Profile photo removed!");
  };

  const handleDietaryStyleChange = (style) => {
    setFormData((prev) => ({
      ...prev,
      dietaryStyles: prev.dietaryStyles.includes(style)
        ? prev.dietaryStyles.filter((s) => s !== style)
        : [...prev.dietaryStyles, style],
    }));
    console.log("Updated dietary styles:", formData.dietaryStyles);

    if (formData.autoSave) {
      showToast("Dietary preferences updated!");
    }
  };

  const handleUpdateInfo = () => {
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const location = formData.location;
    const user_info = { name, email, password, location };
    console.log("Update Profile Api ", user_info);
    showToast("Profile information updated successfully!");
  };

  const handleChangePassword = () => {
    showToast("Password change initiated. Check your email!");
  };

  const handleRecalculateCycle = () => {
    showToast("Cycle recalculated based on recent data!");
  };

  const handleSaveReminderPreferences = () => {
    showToast("Reminder preferences saved!");
  };

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
    showToast("All changes saved successfully!");
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-y-scroll">
      {/* Toast Notification */}
      {toast && (
        <div className="toast toast-top toast-end">
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

              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <label
                    htmlFor="profilePhoto"
                    className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden block"
                  >
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </label>

                  {/* Remove photo button - only show if there's a photo */}
                  {profileImagePreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                      title="Remove photo"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">
                  {profileImagePreview
                    ? "Click image to change photo"
                    : "Click to upload photo"}
                </p>
              </div>

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

                <input
                  type="text"
                  name="location"
                  placeholder="Location (optional)..."
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />

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

                <button
                  onClick={handleRecalculateCycle}
                  className="btn btn-outline w-full"
                >
                  Recalculate My Cycle
                </button>
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

                <button
                  onClick={handleSaveReminderPreferences}
                  className="btn btn-success bg-brandPrimary text-white"
                >
                  Save Reminder Preferences
                </button>
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
                {formData.showFENYXInsights && (
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Adjust symptom tracking depth
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="symptomTrackingDepth"
                          value="Basic"
                          checked={formData.symptomTrackingDepth === "Basic"}
                          onChange={handleInputChange}
                          className="radio radio-success"
                        />
                        <span>Basic</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="symptomTrackingDepth"
                          value="Advanced"
                          checked={formData.symptomTrackingDepth === "Advanced"}
                          onChange={handleInputChange}
                          className="radio radio-success"
                        />
                        <span>Advanced</span>
                      </label>
                    </div>
                  </div>
                )}
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
                  {[
                    "Vegan",
                    "Vegetarian",
                    "Pescatarian",
                    "Paleo",
                    "Keto",
                    "Mediterranean",
                    "Gluten-Free",
                    "None",
                  ].map((diet) => (
                    <label key={diet} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.dietaryStyles.includes(diet)}
                        onChange={() => handleDietaryStyleChange(diet)}
                        className="checkbox checkbox-success"
                      />
                      <span>{diet}</span>
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
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Data Control & Privacy
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleExportData("CSV")}
                    className="btn btn-outline"
                  >
                    Export data (CSV)
                  </button>
                  <button
                    onClick={() => handleExportData("PDF")}
                    className="btn btn-outline"
                  >
                    Export data (PDF)
                  </button>
                </div>

                <button
                  onClick={handleClearSymptoms}
                  className="btn bg-brandSecondary w-full"
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
                  className="btn btn-error w-full text-white"
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

          <div className="mt-4">
            <label className="flex items-center justify-center space-x-3">
              <input
                type="checkbox"
                name="autoSave"
                checked={formData.autoSave}
                onChange={handleInputChange}
                className="checkbox checkbox-success"
              />
              <span className="text-sm text-gray-600">
                Enable auto-save with toast notifications
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
