import React from "react";
import DesktopNavBar from "./DesktopNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import MobileNavBar from "./MobileNavBar";
import "../../StyleSheet/NavBar.css";
const NavBar = () => {
  return (
    <div className="NavBar__container">
      <BrowserView>
        <DesktopNavBar />
      </BrowserView>
      <MobileView>
        <MobileNavBar />
      </MobileView>
    </div>
  );
};

export default NavBar;
