import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../../StyleSheet/HomeProducts.css";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
const DesktopView = () => {
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState('')
  const [product3, setProduct3] = useState('')
  const url = `/api/home-products`;
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const pusher = new Pusher("ddf33ffd13aea6ae2d69", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("homeContent");
    channel.bind("updated", (data) => {
      
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [product1]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(url);
      
      if (mounted) {
        setProduct1({images:data[0].images[0], _id:data[0]._id});
        setProduct2({images:data[1].images[0], _id:data[1]._id});
        setProduct3({images:data[2].images[0], _id:data[2]._id});
      }
    };
    loadData();
    return () => {
      setMounted(false);
    };
  }, [mounted]);
 
  return (
    <div className="HomeProducts__container">
      {product1 && (
        <div className="HomeProducts__textContainer">
          <Link to="/all-products" className="Router__link">
            <h2>PRODUCTS AVAILABLE</h2>
          </Link>
        </div>
      )}
      {product1 && (
        <div className="HomeProducts__productsContainer">
          {product1.images && product2.images && product3.images && (
            <div className="HomeProducts__products">
                <Link className="Router__link" to={`/product/${product1._id}`}>
                  <img src={product1.images.image} alt="Products"/>
                </Link>
                <Link className="Router__link" to={`/product/${product2._id}`}>
                  <img src={product2.images.image} alt="Products"/>
                </Link>
                <Link className="Router__link" to={`/product/${product3._id}`}>
                  <img src={product3.images.image} alt="Products"/>
                </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopView;
