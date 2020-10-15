import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../../StyleSheet/HomeProducts.css";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
const DesktopView = () => {
  const [products, setProducts] = useState("");
  const url = "/api/home-products";
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const pusher = new Pusher("ddf33ffd13aea6ae2d69", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("homeContent");
    channel.bind("updated", (data) => {
      setProducts(data);
      if (data.images === null) {
        setProducts({ images: products.images, header: data.header });
      } else {
        setProducts({ header: products.header, images: data.images });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [products]);
  useEffect(() => {
   
    const loadData = async()=>{
      const {data} = await axios.get(url)

      if (mounted){
        setProducts(data[0])
      }
    }
    loadData()
    return ()=>{
      setMounted(false)
    }

  }, [mounted]);

  return (
    <div className="HomeProducts__container">
      {products && (
        <div className="HomeProducts__textContainer">
          <Link to="/all-products" className="Router__link">
            <h2>{products.header}</h2>
          </Link>
        </div>
      )}
      {products && (
        <div className="HomeProducts__productsContainer">
          {products.images && (
            <div className="HomeProducts__products">
              {products.images.map((product, index) => {
                return (
                  <div className="HomeProducts__product" key={index}>
                    <Link
                      to="/all-products"
                      className="Router__link  product__link"
                    >
                      <img src={product} alt="" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopView;