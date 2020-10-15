import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

import "../StyleSheet/Footer.css";
const Footer = () => {
  return (
    <div className="Footer__container">
      <div className="Footer__socials">
        <h3>Social Media</h3>
        <div className="Socials">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </div>
      </div>
      <div className="Footer__links">
        <h4>Home Page</h4>
        <h4>Products</h4>
        <h4>Info</h4>
        <h4>Cart</h4>
      </div>
      <div className="Footer__contact">
        <h4>Contact Us</h4>
      </div>
    </div>
  );
};

export default Footer;
