import React from "react";
import "../../../StyleSheet/SideBarLayout.css";
const SideBarLayout = ({ text, Icon }) => {
  return (
    <div className="SideBarLayout__container">
      <Icon className="Sidebar__icon"/>
      <h4 className="Sidebar__text">{text}</h4>
    </div>
  );
};

export default SideBarLayout;
