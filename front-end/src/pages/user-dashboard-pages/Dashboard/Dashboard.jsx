import React from "react";
import DashBoardNavbar from "../../../components/dashboardComponents/DashBoardNavbar";

const Dashboard = () => {
  return (
    <section className="container mx-auto border px-5 min-h-screen">
      <div className="border">
        <DashBoardNavbar></DashBoardNavbar>
      </div>
    </section>
  );
};

export default Dashboard;
