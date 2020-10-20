import React from "react";
import Footer from "./Components/Footer";
import HomeBanner from "./Components/HomeBanner";
import HomeProducts from "./Components/HomeProducts/HomeProducts";
import NavBar from "./Components/NavBar/NavBar";
import "./StyleSheet/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllProducts from "./Components/ProductsPages/AllProducts";
import ProductDetails from "./Components/ProductDetails";
import HomeProductDetails from "./Components/HomeProductDetail";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import AdminsSignin from "./Components/Auth/AdminSignin";
import Dashboard from "./Components/DashBoard/DashBoard.jsx";
import StoreInventory from "./Components/DashBoard/StoreInventory";
import SideBar from "./Components/DashBoard/SideBar/SideBar";
import NewProduct from "./Components/DashBoard/NewProduct";
import HomeContentInventory from "./Components/DashBoard/HomeContentInventory";
import HomeProductForm from "./Components/DashBoard/HomeProductForm";
const App = () => {
  // useEffect(() => {
  //   if (window.performance) {
  //     if (performance.navigation.type == 1) {
  //       alert("This page is reloaded");
  //     } else {
  //       alert("This page is not reloaded");
  //     }
  //   }
  // });

  return (
    <Router className="App__container">
      <NavBar />
      <Switch>
        <Route path="/admin-dashboard/store">
          <div className="Store__inventory">
            <SideBar />
            <StoreInventory />
          </div>
        </Route>
        <Route path="/remove-home-product/:id">
          <div className="Store__inventory">
            <SideBar />
            <HomeProductForm />
          </div>
        </Route>
        <Route path="/admin-dashboard/homePage-content">
          <div className="Store__inventory">
            <SideBar />
            <HomeContentInventory />
          </div>
        </Route>
        <Route path="/admin-dashboard/add-new-product">
          <div className="Store__inventory">
            <SideBar />
            <NewProduct />
          </div>
        </Route>
        <Route path="/admin-dashboard">
          <Dashboard />
        </Route>
        <Route path="/user-signin">
          <SignIn />
        </Route>
        <Route path="/admins-userLogin">
          <AdminsSignin />
        </Route>
        <Route path="/user-signup">
          <SignUp />
        </Route>
        <Route path="/product/:id">
          <HomeProductDetails />
        </Route>
        <Route path="/product-detail/:id">
          <ProductDetails />
        </Route>
        <Route path="/all-products" exact={true}>
          <AllProducts />
          <Footer />
        </Route>
        <Route path="/" exact={true}>
          <HomeBanner />
          <HomeProducts />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
