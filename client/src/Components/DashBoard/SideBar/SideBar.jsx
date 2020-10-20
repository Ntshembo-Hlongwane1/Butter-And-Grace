import React from "react";
import SideBarLayout from "./SideBarLayout";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import { Link } from "react-router-dom";
import "../../../StyleSheet/SideBar.css";
const SideBar = () => {
  return (
    <div className="SideBar__container">
      <Link to="/admin-dashboard" className="Router__link">
        <SideBarLayout Icon={HomeOutlinedIcon} text={`Home`} />
      </Link>
      <Link to="/admin-dashboard/store" className="Router__link">
        <SideBarLayout
          Icon={StoreMallDirectoryOutlinedIcon}
          text={`Store Complete Inventory`}
        />
      </Link>
      <Link to="/admin-dashboard/homePage-content" className="Router__link">
        <SideBarLayout
          Icon={StoreMallDirectoryOutlinedIcon}
          text={`Home Page Inventory`}
        />
      </Link>
      <Link to="/admin-dashboard/manage-admins" className="Router__link">
        <SideBarLayout
          Icon={SupervisorAccountOutlinedIcon}
          text={`Manage Admins`}
        />
      </Link>
      <SideBarLayout Icon={ExitToAppOutlinedIcon} text={`Log Out`} />
    </div>
  );
};

export default SideBar;
