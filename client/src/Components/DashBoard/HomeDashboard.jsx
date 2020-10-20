import React from "react";
import "../../StyleSheet/HomeDashBoard.css";
import { Link } from "react-router-dom";
import Cookie from 'js-cookie'
import PageNotFound from "../PageNotFound";
const HomeDashboard = () => {
  const asid = Cookie.get("mufambisi_");
  return (
    <div className="HomeDashboard__container">
      {asid ? <div className="All">
        <div className="Content">
          <h1>WELCOME BACK!</h1>
        </div>
        <div className="Routes">
          <Link className="Router__link" to="/admin-dashboard/homePage-content">
            <div className="Home__content">
              <h3>HOME CONTENT</h3>
            </div>
          </Link>
          <Link className="Router__link" to="/admin-dashboard/store">
            <div className="AllProduct">
              <h3>ALL PRODUCTS</h3>
            </div>
          </Link>
          <Link className="Router__link" to="/admin-dashboard/manage-admins">
            <div className="ManageAdmins">
              <h3>MANAGE ADMINS</h3>
            </div>
          </Link>
        </div>
      </div>: <PageNotFound />}
    </div>
  );
};

export default HomeDashboard;
