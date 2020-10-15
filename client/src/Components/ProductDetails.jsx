import React, { useEffect, useState } from "react";
import axios from "../axios";
import "../StyleSheet/ProductDetails.css";
const ProductDetails = () => {
  const product_id = window.location.href.split("/")[4];
  const url = `/api/product-detail/${product_id}`;
  const [product, setProduct] = useState("");

  const [Qty, setQty] = useState("");
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(url);

      if (mounted) {
        setProduct(data);
      }
    };
    loadData();
    return () => {
      setMounted(false);
    };
  }, [mounted, url]);

  return (
    <div className="ProductDetails__container">
      <div className="Details__container">
        {product && (
          <div className="Details__leftContainer">
            <img src={product.image} alt="" />
            <h3 className="ingredients">Ingredients:</h3>
            <h3 className="Details__ingredients">{product.ingredients}</h3>
            <h3>Product info:</h3>
            <h4 className="Details__infoText">{product.description}</h4>
          </div>
        )}
        {product && (
          <div className="Details__rightContainer">
            <h3>PRODUCT SUMMARY</h3>
            <h4>Price: R500</h4>
            Qty:
            <select value={Qty} onChange={(e) => setQty(e.target.value)}>
              <option>...</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className="Add__cartButton">ADD TO CART</button>
            <button>BUY NOW</button>
          </div>
        )}
      </div>
      )
    </div>
  );
};

export default ProductDetails;
