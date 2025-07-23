import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Rate, BackTop } from "antd";
import { formatNumber } from "../../utils";
import "../ProductItems/index.scss";

const ProductItems = (props) => {
  <ToastContainer
    position="top-center"
    autoClose={500}
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
  const [showBackTop, setShowBackTop] = useState(false);

  const { addItem } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const notifySuccess = () => {
    addItem(props.item);
    toast("Product added to cart", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
    });
  };

  const notifyError = () => {
    setTimeout(() => {
      navigate("/login");
    }, 500);
    toast.error("Please login account user!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleAddItem = () => {
    token !== null ? notifySuccess() : notifyError();
  };
  const handleScroll = () => {
    setShowBackTop(window.scrollY > 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <ScrollAnimation animateIn="fadeIn">
        <div
          className={`bg-white shadow-lg rounded-2xl p-3 flex flex-col  transition-all `}
        >
          <div className="product">
            <Link to={`/productDetails/${props.id}`} state={{ from: props.id }}>
              <div>
                <div class="discountPercentage">
                  <div class="number-discount">
                    <span class="percent">
                      {Math.round(props?.item?.discountPercentage)}%
                    </span>
                  </div>
                </div>
                <img
                  src={props.image}
                  alt="Loading"
                  className="w-36 h-40 mx-auto"
                />
              </div>

              <p className="title font-semibold text-lg my-3">
                {props.title.slice(0, 25)}...
              </p>
              <p className="description my-3">
                {props.description.slice(0, 70)}...
              </p>

              <div class="price-total">
                <div class="old-price">
                  <span class="unit-price"> ₫</span>
                  <span class="num-old-price">
                    {formatNumber(props.price * 23000)}
                  </span>
                </div>
                <div> </div>
                <div class="new-price">
                  <span class="unit-price">₫</span>
                  <span class="num-new-price">
                    {formatNumber(
                      props.price * 23000 -
                        Math.round(
                          (props.price * props?.item?.discountPercentage) / 100
                        ) *
                          23000
                    )}
                  </span>
                </div>
              </div>
            </Link>
            <p className="stock"> Còn {props.item.stock} sản phẩm</p>
            <Rate disabled defaultValue={props?.item?.rating} />
            <h1>
              <button
                className=" bg-orange-400 text-white text-center w-full rounded-xl my-3 p-2 md:hover:scale-95"
                id="add"
                onClick={handleAddItem}
              >
                Add to Cart
              </button>
            </h1>
            <ToastContainer autoClose={1500} />
          </div>
        </div>
      </ScrollAnimation>
      {showBackTop && (
        <BackTop visibilityHeight={300}>
          <div className="ant-back-top-inner">↑</div>
        </BackTop>
      )}
    </>
  );
};

export default ProductItems;
