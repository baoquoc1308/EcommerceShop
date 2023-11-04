import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import { fetchApi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetails.scss";
import { Spin } from "antd";

function ProductDetails(props) {
  props.myFun(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const handleResponseGetProductDetails = (data) => {
    setProducts(data);
    setLoading(false);
  };
  const handleError = (data) => {
    toast.error(data?.message || "Something went wrong!", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleGetProductDetails = () => {
    fetchApi(
      "GET",
      "https://dummyjson.com",
      `products/${from}`,
      handleResponseGetProductDetails,
      handleError
    );
    setLoading(true);
  };
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleAddToCart = () => {
    addItem(products);
    toast.success("Product added to cart", {
      position: "top-right",
      autoClose: 500,
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetProductDetails();
  }, []);

  const location = useLocation();
  const { from } = location.state;
  return (
    <div className=" lg:my-40 my:20 mx-8">
      <div
        className={`${
          props.mode === "dark" ? "text-white" : "text-black"
        } p-3 flex flex-col  transition-all   mt-20 mx-auto md:w-96 lg:w-full justify-center`}
      >
        {!loading ? (
          <div className="product flex flex-col lg:flex-row">
            <div className="img lg:mx-4">
              <img
                src={products?.images?.[0]}
                alt="Loading"
                className="image-products mx-auto bg-white shadow-lg rounded-2xl p-8"
              />
            </div>
            <div className="desc lg:mx-4">
              <p className="title font-semibold text-3xl my-7">
                {products?.title}
              </p>
              <p className="my-3 box-border">{products?.description}</p>
              <div class="price-total">
                <div class="old-price">
                  <span class="unit-price"> ₫</span>
                  <span class="num-old-price">
                    {formatNumber(products.price * 23000)}
                  </span>
                </div>
                <div> </div>
                <div class="new-price">
                  <span class="unit-price">₫</span>
                  <span class="num-new-price">
                    {formatNumber(
                      products.price * 23000 -
                        Math.round(
                          (products.price * products?.discountPercentage) / 100
                        ) *
                          23000
                    )}
                  </span>
                </div>
              </div>
              <button
                className="bg-gray-500 text-white text-center  rounded-xl my-3 px-4 py-2 hover:scale-95"
                onClick={handleAddToCart}
              >
                Buy Now
              </button>
              <ToastContainer autoClose={1500} />
            </div>
          </div>
        ) : (
          <Spin tip="Loading"></Spin>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
