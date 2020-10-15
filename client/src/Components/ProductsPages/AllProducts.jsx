import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import "../../StyleSheet/AllProducts.css";
import { Link } from "react-router-dom";
const AllProducts = () => {
  const url = "/api/all-products";
  const [products, setProducts] = useState();
  const [status, setStatus] = useState("");
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        setStatus(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="All__availProductsContainer">
      {status && status === 500 ? (
        <h1>Server is currently down :(</h1>
      ) : (
        products && (
          <div className="AllProducts__container">
            <h3>ALL PRODUCTS</h3>
            <div className="Allproducts__container">
              {products.map((product) => {
                return (
                  <div className="all_products" key={product._id}>
                    <Link
                      to={`/product-detail/${product._id}`}
                      className="Router__link"
                    >
                      <img
                        src={product.image}
                        alt="Product not visible? Contact please"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AllProducts;
