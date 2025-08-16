import React from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";
import "../ProductItems/index.scss";
import { ShoppingCart } from "lucide-react";
import { useNotification } from "../Notification";

const ProductItems = (props) => {
  const notification = useNotification();


  const { addItem } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { price, item } = props;
  const discount = item?.discountPercentage ?? 0;

  const discountedPrice = (price - (price * discount) / 100).toFixed(2);
  const savings = ((price * discount) / 100).toFixed(2);

  const notifySuccess = () => {
    addItem(props.item);
    notification.success("Product added to cart", 3000);
  };

  const notifyError = () => {
    setTimeout(() => {
      navigate("/login");
    }, 500);
    notification.error("Please login account user!", 3000);
  };
  const handleAddItem = () => {
    token !== null ? notifySuccess() : notifyError();
  };



  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col transition-all w-full max-w-xs mx-auto">
        <Link to={`/productDetails/${props.id}`} state={{ from: props.id }}>
          <div className="relative flex justify-center items-center mb-3">
            <img
              src={props.image}
              alt={props.title}
              className="object-contain w-40 h-44 rounded-xl shadow-sm bg-gray-50"
            />
            {props?.item?.discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                <span className="text-yellow-300">⚡</span>-
                {Math.round(props?.item?.discountPercentage)}%
              </div>
            )}
          </div>

          <div className="px-1">
            <p
              className="font-semibold text-lg truncate mb-1"
              title={props.title}
            >
              {props.title}
            </p>
            <p
              className="text-gray-500 text-sm truncate line-clamp-2 mb-2"
              title={props.description}
            >
              {props.description.slice(0, 70)}...
            </p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="line-through text-gray-400 text-xs mr-1">
                ${price.toFixed(2)}
              </span>
              <span className="text-red-500 text-lg font-bold">
                ${discountedPrice}
              </span>
            </div>
            <div className="bg-green-100 text-green-600 text-xs rounded px-2 py-1 font-medium">
              Save ${savings}
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{props.item.stock} left in stock</span>
          <Rate disabled defaultValue={props?.item?.rating} />
        </div>

        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full rounded-xl py-2 flex items-center justify-center text-base font-semibold hover:from-blue-600 hover:to-purple-700 transition mb-2"
          id="add"
          onClick={handleAddItem}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>

      
      </div>
    </>
  );
};

export default ProductItems;
