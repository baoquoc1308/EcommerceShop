import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import { fetchApi } from '../api/api';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ProductDetails(props) {

  props.myFun(false)

  const [products, setProducts] = useState([]);
  const { addItem } = useCart();

  const handleResponseGetProductDetails = (data) => {
    setProducts(data);
  }
  const handleError = (data) => {
    toast.error(data?.message || 'Something went wrong!', {
      position: "top-right",
      autoClose: 1500,
    });
  }

  const handleGetProductDetails = () => {
    fetchApi("GET", 'https://dummyjson.com', `products/${from}`, handleResponseGetProductDetails, handleError)
  };
  const handleAddToCart = () => {
    addItem(products); 
    toast.success("Product added to cart", {
      position: "top-right",
      autoClose: 1500,
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
        className={`${props.mode === "dark" ? "text-white" : "text-black"
          } p-3 flex flex-col  transition-all   mt-20 mx-auto md:w-96 lg:w-full justify-center`}
      >
        <div className="product flex flex-col lg:flex-row">
          <div className="img lg:mx-4">
            <img
              src={products?.images?.[0]}
              alt="Loading"
              className="mx-auto bg-white shadow-lg rounded-2xl p-8"
            />
          </div>
          <div className="desc lg:mx-4">
            <p className="title font-semibold text-3xl my-7">{products?.title}</p>
            <p className="my-3 box-border">{products?.description}</p>
            <p className="my-6  text-2xl">
              $ <b>{products?.price}</b>
            </p>
            <button className="bg-gray-500 text-white text-center  rounded-xl my-3 px-4 py-2 hover:scale-95" onClick={handleAddToCart}>
              Buy Now
            </button>
            <ToastContainer autoClose={1500} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
