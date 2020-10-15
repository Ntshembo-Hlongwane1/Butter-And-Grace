import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import "../../StyleSheet/AllProducts.css";
import { Link } from "react-router-dom";
const AllProducts = () => {
  const url = "/api/all-products";
  const [products, setProducts] = useState();
 
  const [mounted, setMounted] = useState(true)
  useEffect(() => {

    const loadData = async()=>{
      const {data} = await axios.get(url)

      if (mounted){
        setProducts(data)
      }
    }
    loadData()
    return ()=>{
      setMounted(false)
    }

  }, [mounted]);
  console.log(products);
  return (
    <div className="All__availProductsContainer">
      {products && <div className="AllProducts__container">
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
      </div>}
    </div>
  );
};

export default AllProducts;
