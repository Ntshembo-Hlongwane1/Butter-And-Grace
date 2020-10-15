import React from "react";
import Footer from "./Components/Footer";
import HomeBanner from "./Components/HomeBanner";
import HomeProducts from "./Components/HomeProducts/HomeProducts";
import NavBar from "./Components/NavBar/NavBar";
import "./StyleSheet/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllProducts from "./Components/ProductsPages/AllProducts";
import ProductDetails from "./Components/ProductDetails";

const App = () => {
  return (
    <Router className="App__container">
      <NavBar />
      <Switch>
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
