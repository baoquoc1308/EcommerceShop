import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { fetchApi } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ProductDetails/index.scss";
import { Spin, Rate } from "antd";
import { News } from "../imgP";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatNumber } from "../../utils";

function ProductDetails(props) {
  props.myFun(false);
  props.myFun2(true);

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const token = localStorage.getItem("accessToken");

  const location = useLocation();

  const { from } = location.state;

  const [productsSuggestion, setProductsSuggestion] = useState([]);

  const newProductsSuggestion = productsSuggestion?.products?.filter((item) => {
    return item?.id !== products?.id;
  });

  const handleResponseGetProductsSuggestion = (data) => {
    setProductsSuggestion(data);
  };

  const handleGetCategoryProducts = () => {
    fetchApi(
      "GET",
      "https://dummyjson.com",
      `products/category/${products?.category}`,

      handleResponseGetProductsSuggestion,
      handleError
    );
  };

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
  const notifySuccess = () => {
    addItem(products);
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

  useEffect(() => {
    window.scrollTo(0, 0);

    handleGetProductDetails();

    products?.length > 0 && handleGetCategoryProducts();
  }, []);

  useEffect(() => {
    products?.category && handleGetCategoryProducts();
  }, [products?.category]);

  const [oldId, setOldId] = useState(location.pathname.split("/").pop());

  const [isReloaded, setIsReloaded] = useState(false);
  useEffect(() => {
    if (oldId !== location.pathname.split("/").pop()) {
      setOldId(location.pathname.split("/").pop());
      window.location.reload();
      setIsReloaded(true);
    }

    if (oldId === location.pathname.split("/").pop()) {
      setIsReloaded(false);
    }
  }, [location.pathname, isReloaded]);

  useEffect(() => {
    setOldId(location.pathname.split("/").pop());
  }, []);

  return (
    <div className=" lg:my-20 mx-8">
      <div
        className={`p-3 flex flex-col  transition-all mt-0 mx-auto md:w-96 lg:w-full justify-center`}
      >
        {!loading ? (
          <div className="product flex flex-col lg:flex-row">
            <div className="img lg:mx-4">
              <div class="discountPercentage_details">
                <div class="number-discount">
                  <span class="percent">
                    {Math.round(products?.discountPercentage)}%
                  </span>
                </div>
              </div>
              <img
                src={products?.images?.[0]}
                alt="Loading"
                className="image-products mx-auto bg-white shadow-lg rounded-2xl p-8"
              />
              <>
                <News data={products?.images} />
              </>
            </div>
            <div className="desc lg:mx-4">
              <p className="title font-semibold text-3xl my-7">
                {products?.title}
              </p>
              <p className="my-1 box-border">{products?.description}</p>

              <div class="price-total">
                <div class="old-price">
                  <span class="unit-price"> ₫</span>
                  <span class="num-old-price">
                    {formatNumber(products?.price * 23000)}
                  </span>
                </div>
                <div class="new-price">
                  <span class="unit-price">₫</span>
                  <span class="num-new-price">
                    {formatNumber(
                      products?.price * 23000 -
                        Math.round(
                          (products?.price * products?.discountPercentage) / 100
                        ) *
                          23000
                    )}
                  </span>
                </div>
              </div>
              <p className="stock"> Còn {products.stock} sản phẩm</p>
              <Rate disabled defaultValue={products?.rating} />
              <button
                className="bg-orange-400 text-white text-center  rounded-xl my-1 py-2 hover:scale-95"
                id="add"
                onClick={handleAddItem}
              >
                Buy Now
              </button>
              <ToastContainer autoClose={1500} />
            </div>
            <div className="desc lg:mx-4">
              <p>Gợi ý</p>

              {newProductsSuggestion?.map((element) => {
                return (
                  <div className="product bg-white rounded-lg p-2 mx-11 md:mx-0">
                    <Link
                      to={`/productDetails/${element.id}`}
                      state={{ from: element?.id }}
                    >
                      <div>
                        <img
                          src={element?.images[0]}
                          alt="Loading"
                          className="w-20 h-30 mx-auto"
                        />
                      </div>

                      <p className="title font-semibold text-xs my-1">
                        {element.title.slice(0, 25)}...
                      </p>
                      <div class="price-total">
                        <div class="new-price">
                          <span class="unit-price">₫</span>
                          <span class="num-new-prices">
                            {formatNumber(
                              element.price * 23000 -
                                Math.round(
                                  (element.price *
                                    element?.discountPercentage) /
                                    100
                                ) *
                                  23000
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
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
