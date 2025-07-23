import React from "react";
import { useRef, useState, useEffect } from "react";
import { fetchApi } from "../../api/api";
import { useCart } from "react-use-cart";
import collection1 from "../images/smartphone-collection.jpg";
import collection2 from "../images/laptops-collection.jpg";
import collection3 from "../images/manswatches-collection.jpg";
import collection4 from "../images/womenswatches-collection.jpg";
import ScrollAnimation from "react-animate-on-scroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../Collection/index.scss";
import { Rate } from "antd";
import { formatNumber } from "../../utils";

function Collection(props) {
  const { addItem } = useCart();

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [category, setcategory] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleResponseGetCategoryProducts = (data) => {
    setProducts(data);
  };
  const handleError = () => {
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleGetCategoryProducts = (collection) => {
    setcategory(collection);
    handleClick();
    fetchApi(
      "GET",
      "https://dummyjson.com",
      `products/category/${collection}`,

      handleResponseGetCategoryProducts,
      handleError
    );
  };

  const notifySuccess = () => {
    toast("Product added to cart", {
      position: toast.POSITION.TOP_RIGHT,
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  props.myFun(false);
  props.myFun2(true);

  return (
    <div className=" my-20">
      <ScrollAnimation animateIn="fadeIn" initiallyVisible={true}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="mx-4 my-4  cursor-pointer"
            onClick={() => handleGetCategoryProducts("smartphones")}
          >
            <img
              src={collection1}
              alt=""
              className="h-40 md:h-52 w-full rounded-xl relative -z-20"
            />
            <h1 className="absolute text-black font-semibold bg-gray-50 rounded-md text-2xl -mt-8 -z-10 px-2 md:text-3xl">
              SMARTPHONES
            </h1>
          </div>

          <div
            className="mx-4 my-4 cursor-pointer "
            onClick={() => handleGetCategoryProducts("laptops")}
          >
            <img
              src={collection2}
              alt=""
              className="h-40 md:h-52 w-full rounded-xl relative -z-20"
            />
            <h1 className="absolute text-black font-semibold bg-gray-50 rounded-md text-2xl -mt-8 -z-10 px-2 md:text-3xl">
              LATOPS
            </h1>
          </div>

          <div
            className="mx-4 my-4 cursor-pointer "
            onClick={() => handleGetCategoryProducts("mens-watches")}
          >
            <img
              src={collection3}
              alt=""
              className="h-40 md:h-52 w-full rounded-xl relative -z-20"
            />
            <h1 className="absolute text-white text-2xl -mt-8 bg-blue-800 rounded-md -z-10 px-2 md:text-3xl">
              MENS-WATCHES
            </h1>
          </div>
          <div
            className="mx-4 my-4 cursor-pointer "
            onClick={() => handleGetCategoryProducts("womens-watches")}
          >
            <img
              src={collection4}
              alt=""
              className="h-40 md:h-52 w-full rounded-xl relative -z-20"
            />
            <h1 className="absolute text-white text-2xl -mt-8 bg-orange-900 px-2 rounded-md -z-10 md:text-3xl">
              WOMENS-WATCHES
            </h1>
          </div>
        </div>
      </ScrollAnimation>

      <h1
        ref={ref}
        className={`text-center font-semibold text-2xl uppercase my-8`}
      >
        {category}
      </h1>
      <div className="collection my-5 mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 ">
        {products?.products?.map((element) => {
          return (
            <ScrollAnimation
              animateIn="fadeIn"
              initiallyVisible={false}
              key={element?.id}
            >
              <div className="product bg-white rounded-lg p-4 mx-11 md:mx-0">
                <Link
                  to={`/productDetails/${element.id}`}
                  state={{ from: element?.id }}
                >
                  <div>
                    <div class="discountPercentage">
                      <div class="number-discount">
                        <span class="percent">
                          {Math.round(element?.discountPercentage)}%
                        </span>
                      </div>
                    </div>
                    <img
                      src={element?.images[0]}
                      alt="Loading"
                      className="w-36 h-40 mx-auto"
                    />
                  </div>

                  <p className="title font-semibold text-lg my-3">
                    {element.title.slice(0, 25)}...
                  </p>
                  <p className="description my-3 ">
                    {element.description.slice(0, 70)}...
                  </p>
                  <div class="price-total">
                    <div class="old-price">
                      <span class="unit-price"> ₫</span>
                      <span class="num-old-price">
                        {formatNumber(element.price * 23000)}
                      </span>
                    </div>
                    <div> </div>
                    <div class="new-price">
                      <span class="unit-price">₫</span>
                      <span class="num-new-price">
                        {formatNumber(
                          element.price * 23000 -
                            Math.round(
                              (element.price * element?.discountPercentage) /
                                100
                            ) *
                              23000
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
                <p className="stock"> Còn {element?.stock} sản phẩm</p>
                <Rate disabled defaultValue={element?.rating} />
                <button
                  className="bg-orange-400 text-white text-center w-full rounded-xl my-3 p-2 md:hover:scale-95"
                  id="add"
                  onClick={() => {
                    if (token !== null) {
                      addItem(element);
                      toast.success("Product added to cart", {
                        position: "top-right",
                        autoClose: 500,
                      });
                    } else {
                      notifyError();
                    }
                  }}
                >
                  Add to Cart
                </button>
                <ToastContainer autoClose={1500} />
              </div>
            </ScrollAnimation>
          );
        })}
      </div>
    </div>
  );
}

export default Collection;
