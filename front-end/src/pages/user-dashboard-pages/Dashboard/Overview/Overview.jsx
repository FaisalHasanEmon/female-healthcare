import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const fakeAPI = [
  {
    id: 1,
    name: "Alice",
    hasCycle: true,
    concerns: ["mood", "fatigue"],
    dietaryStyle: "vegan",
    activityLevel: "high",
    onHormonalSupport: false,
    reminders: { completed: 12, missed: 3 },
    cycleData: [5, 6, 7, 8, 9, 10, 11],
    moodData: [2, 3, 4, 3, 5, 4, 3],
    fatigueData: [3, 4, 3, 2, 4, 5, 4],
  },
];

export default function Overview() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData(fakeAPI[0]);
    }, 1000);
  }, []);

  if (!userData) return <div className="text-center p-10">Loading...</div>;

  // Chart Configurations
  const cycleChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Cycle Phase",
        data: userData.cycleData,
        borderColor: "#f472b6",
        backgroundColor: "rgba(244, 114, 182, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const moodChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood Level",
        data: userData.moodData,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const fatigueChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Fatigue Level",
        data: userData.fatigueData,
        backgroundColor: "#fbbf24",
      },
    ],
  };

  const reminderChartData = {
    labels: ["Completed", "Missed"],
    datasets: [
      {
        label: "Reminders",
        data: [userData.reminders.completed, userData.reminders.missed],
        backgroundColor: ["#34d399", "#f87171"],
      },
    ],
  };

  return (
    // <div className="p-6 space-y-6">
    //   <h1 className="text-3xl font-bold text-center mb-6">
    //     Welcome, {userData.name}
    //   </h1>

    //   <div className="grid md:grid-cols-2 gap-6">
    //     {/* Cycle Chart */}
    //     {userData.hasCycle && !userData.onHormonalSupport && (
    //       <div className="card bg-base-100 shadow-xl p-4">
    //         <h2 className="text-xl font-semibold mb-4">Cycle Phase Tracker</h2>
    //         <Line data={cycleChartData} />
    //       </div>
    //     )}

    //     {/* Mood Chart */}
    //     {userData.concerns.includes("mood") && (
    //       <div className="card bg-base-100 shadow-xl p-4">
    //         <h2 className="text-xl font-semibold mb-4">Mood Tracking</h2>
    //         <Line data={moodChartData} />
    //       </div>
    //     )}

    //     {/* Fatigue Chart */}
    //     {userData.concerns.includes("fatigue") && (
    //       <div className="card bg-base-100 shadow-xl p-4">
    //         <h2 className="text-xl font-semibold mb-4">Fatigue Tracking</h2>
    //         <Bar data={fatigueChartData} />
    //       </div>
    //     )}

    //     {/* Reminder Chart */}
    //     <div className="card bg-base-100 shadow-xl p-4">
    //       <h2 className="text-xl font-semibold mb-4">Reminders Summary</h2>
    //       <Pie data={reminderChartData} />
    //     </div>
    //   </div>
    // </div>
    <div>Thi is overview Part</div>
  );
}
