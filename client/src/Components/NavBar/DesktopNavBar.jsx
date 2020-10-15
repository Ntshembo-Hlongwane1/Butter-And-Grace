import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import InfoIcon from "@material-ui/icons/Info";
import "../../StyleSheet/DesktopNav.css";
import PersonIcon from "@material-ui/icons/Person";
import {useHistory} from 'react-router-dom'
const DesktopNavBar = () => {
  const history = useHistory()
  const returnHome=()=>{
    history.push('/')
  }
  return (
    <div className="DesktopNav__container">
      <div className="DesktopNav__leftContainer">
        <h2 onClick={returnHome}>BUTTER & GRACE</h2>
      </div>
      <div className="DesktopNav__rightContainer">
        <div className="DesktopNav__userLogin">
          <PersonIcon className="DesktopNav__icon" />
        </div>
        <div className="DesktopNav__cart">
          <ShoppingBasketIcon className="DesktopNav__icon" />
        </div>
        <div className="DesktopNav__infoSection">
          <InfoIcon className="DesktopNav__icon" />
        </div>
      </div>
    </div>
  );
};

export default DesktopNavBar;
