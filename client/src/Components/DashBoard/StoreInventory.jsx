import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../StyleSheet/AllProducts.css";
import { Link } from "react-router-dom";

const StoreInventory = () => {
  const url = `/api/all-products`;
  const [products, setProducts] = useState();

  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(url);

      if (mounted) {
        setProducts(data);
        console.log(data);
      }
    };
    loadData();
    return () => {
      setMounted(false);
    };
  }, [mounted]);

  const removeProduct = (ID) => {
    const url = `/api/delete-product/${ID}`;

    axios
      .post(url)
      .then((response) => {
        alert(response.data.msg);
        window.location.reload(false)
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  return (
    <div className="All__availProductsContainer" style={{ flex: "0.8" }}>
      {products && (
        <div className="AllProducts__container">
          <div className="Text">
            <h3>ALL PRODUCTS</h3>
            <Link to="/admin-dashboard/add-new-product">
              <button className="Store__buttonAdd">ADD NEW PRODUCT</button>
            </Link>
          </div>
          <div className="Allproducts__container">
            {products.map((product) => {
              return (
                <div className="all_products" key={product._id}>
                  <div className="Router__link">
                    <img
                      src={product.image}
                      alt="Product not visible? Contact please"
                    />
                    <button
                      className="Store__buttonRemove"
                      onClick={() => removeProduct(product._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInventory;
