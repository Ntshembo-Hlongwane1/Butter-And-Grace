import React from "react";
import homeBanner from "../images/homeBanner.jpg";
import "../StyleSheet/HomeBanner.css";
const HomeBanner = () => {
  return (
    <div className="HomeBanner__container">
      <img src={homeBanner} alt="Home Banner" />
    </div>
  );
};

export default HomeBanner;
