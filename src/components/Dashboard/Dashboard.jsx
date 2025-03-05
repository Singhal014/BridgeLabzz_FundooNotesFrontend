import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <main className="content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Dashboard;
