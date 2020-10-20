import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../../StyleSheet/HomeProducts.css";
import Pusher from "pusher-js";
import { Link, useHistory } from "react-router-dom";

const HomeInventory = () => {
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");
  const [product3, setProduct3] = useState("");
  const url = `/api/home-products`;
  const [mounted, setMounted] = useState(true);
    const history = useHistory()
  useEffect(() => {
    const pusher = new Pusher("ddf33ffd13aea6ae2d69", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("homeContent");
    channel.bind("updated", (data) => {});

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [product1]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(url);

      if (mounted) {
        setProduct1({ images: data[0].images[0], _id: data[0]._id });
        setProduct2({ images: data[1].images[0], _id: data[1]._id });
        setProduct3({ images: data[2].images[0], _id: data[2]._id });
      }
    };
    loadData();
    return () => {
      setMounted(false);
    };
  }, [mounted]);


  const removeProduct = (ID)=>{
    history.push(`/remove-home-product/${ID}`)
  }

  return (
    <div className="HomeProducts__container" style={{ flex: "0.8" }}>
      {product1 && (
        <div className="HomeProducts__textContainer">
          <Link to="/all-products" className="Router__link">
            <h2>HOME PAGE PRODUCTS</h2>
          </Link>
        </div>
      )}
      {product1 && (
        <div className="HomeProducts__productsContainer">
          {product1.images && product2.images && product3.images && (
            <div className="HomeProducts__products">
              <Link className="Router__link" >
                <img src={product1.images.image} alt="Products" />
                <button onClick={()=>removeProduct(product1._id)}>DELETE</button>
              </Link>
              <Link className="Router__link">
                <img src={product2.images.image} alt="Products" />
                <button onClick={()=>removeProduct(product2._id)}>DELETE</button>
              </Link>
              <Link className="Router__link">
                <img src={product3.images.image} alt="Products" />
                <button onClick={()=>removeProduct(product3._id)}>DELETE</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeInventory;
