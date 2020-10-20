import React from "react";
import ErrorPage from "../images/404.gif";
const PageNotFound = () => {
  return (
    <div>
      <img src={ErrorPage} alt="" style={{ margin:'auto', display:'block', objectFit:'cover', marginTop:'2em'}}/>
    </div>
  );
};

export default PageNotFound;
