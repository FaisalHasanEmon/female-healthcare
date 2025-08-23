// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// export function DoughnutChart() {
//   return <Doughnut data={data} />;
// }

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Menstrual",
    "Early Follicular",
    "Late Follicular",
    "Ovulatory",
    "Early Luteal",
    "Late Luteal",
  ],
  datasets: [
    {
      label: "Cycle Phases",
      data: [3, 4, 5, 2, 4, 4], // Example days — replace with real data
      backgroundColor: [
        "#4A90E2", // Menstrual
        "#F78DA7", // Early Follicular
        "#FFB6C1", // Late Follicular
        "#7ED321", // Ovulatory
        "#F5A623", // Early Luteal
        "#D0021B", // Late Luteal
      ],
      borderWidth: 0,
    },
  ],
};

// Plugin to draw centered text
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.restore();
    const fontSize = height / 120;
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center"; // ensures horizontal centering
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText("Day 18", width / 2, height / 2); // perfectly center
    ctx.save();
  },
};

const options = {
  cutout: "70%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 10,
      },
      maxHeight: 80, // allow two rows
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed}`,
      },
    },
  },
  onClick: () => {}, // disable slice hiding on click
};

export function DoughnutChart() {
  return (
    <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
  );
}
