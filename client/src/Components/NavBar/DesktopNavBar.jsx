import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import InfoIcon from "@material-ui/icons/Info";
import "../../StyleSheet/DesktopNav.css";
import PersonIcon from "@material-ui/icons/Person";

import Cookie from "js-cookie";
import { Link, useHistory } from "react-router-dom";
const DesktopNavBar = () => {
  const history = useHistory();
  const usid = Cookie.get("muxavi_");
  const asid = Cookie.get("mufambisi_");
  const [isOpen, setIsOpen] = useState(false);

  const returnHome = () => {
    history.push("/");
  };

  const showMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    asid ? Cookie.remove("mufambisi_") : Cookie.remove("muxavi_");
    setIsOpen(!isOpen);
    history.push("/");
  };

  return (
    <div className="DesktopNav__container">
      <div className="DesktopNav__leftContainer">
        <h2 onClick={returnHome}>BUTTER & GRACE</h2>
      </div>
      <div className="DesktopNav__rightContainer">
        <div className="DesktopNav__userLogin">
          <div className="user">
            <PersonIcon className="DesktopNav__icon" onClick={showMenu} />
            {isOpen ? (
              <div className="menu__container">
                {usid || asid ? (
                  <div className="menu">
                    <Link onClick={logOut} className="Router__link">
                      <h3>Logout</h3>
                    </Link>
                    <Link
                      onClick={showMenu}
                      className="Router__link"
                      to="/contact-us"
                    >
                      <h3>Contact</h3>
                    </Link>
                    {asid ? (
                      <Link
                        onClick={showMenu}
                        className="Router__link"
                        to="/admin-dashboard"
                      >
                        <h3>Admin Dashboard</h3>
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <div className="menu">
                    <Link
                      onClick={showMenu}
                      className="Router__link"
                      to="/user-signin"
                    >
                      <h3>Login</h3>
                    </Link>
                  </div>
                )}
              </div>
            ) : null}
          </div>
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
