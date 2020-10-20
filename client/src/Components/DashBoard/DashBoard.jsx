import React from "react";
import HomeDashboard from "./HomeDashboard";
import SideBar from "./SideBar/SideBar";
import "../../StyleSheet/DashBoard.css";
const DashBoard = () => {
  return (
    <div className="DashBoard__container">
      <div className="DashBoard__mainContent">
        <SideBar />
        <HomeDashboard />
      </div>
    </div>
  );
};

export default DashBoard;
