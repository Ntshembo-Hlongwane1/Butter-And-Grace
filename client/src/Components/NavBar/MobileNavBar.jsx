import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoomIcon from "@material-ui/icons/Room";
import CallIcon from "@material-ui/icons/Call";
import LanguageIcon from "@material-ui/icons/Language";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "../../StyleSheet/MobileNav.css";
import { Link, useHistory } from "react-router-dom";
// =========================================================MOBILE NAVBAR================================================
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  const redirectHome = () => {
    setIsOpen(!isOpen);
    history.push("/");
  };
  const redirectHomePrimary = () => {
    history.push("/");
  };
  return (
    <div className="MobileNav__container">
      {isOpen ? null : (
        <div className="Nav__container">
          <div className="Navleft__container">
            <h2 onClick={redirectHomePrimary}>BUTTER & GRACE</h2>
          </div>
          <div className="Navright__container">
            <MenuIcon className="mobile__link" onClick={openMenu} />
          </div>
        </div>
      )}
      {isOpen ? (
        <div className="Mobile__menu">
          <div className="Mobile__menuTop">
            <div className="Brand__nCloseButton">
              <h2 onClick={redirectHome}>BUTTER & GRACE</h2>
              <div className="Closing__button">
                <CloseIcon onClick={openMenu} />
              </div>
            </div>
            <div className="SearchBar">
              <input type="text" placeholder="Search" />
              <SearchIcon />
            </div>
          </div>
          <div className="Mobile__menuCenter">
            <div className="Clothes">
              <Link
                to="/all-products"
                className="Router__link"
                onClick={openMenu}
              >
                <h4>ALL PRODUCTS</h4>
              </Link>
              <ChevronRightIcon className="clothes__arrowIcon" />
            </div>
          </div>
          <div className="Mobile__menuBottom">
            <div className="Wishlist">
              <FavoriteBorderIcon />
              <h4>Wishlist</h4>
            </div>
            <div className="shopping__cart">
              <ShoppingCartIcon />
              <h4>Shopping Cart</h4>
            </div>
            <div className="store__location">
              <RoomIcon />
              <h4>Store location</h4>
            </div>
            <div className="Call">
              <CallIcon />
              <h4>Customer Service</h4>
            </div>
            <div className="region">
              <LanguageIcon />
              <h4>South Africa / English</h4>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
