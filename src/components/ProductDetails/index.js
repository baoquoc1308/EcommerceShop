// src/components/ProductDetails/index.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { fetchApi } from "../../api/api";
import { Spin, Rate } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Package,
  User,
  Layers,
  Wallet,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useNotification } from "../Notification";

function ProductDetails(props) {
  props.myFun(false);
  props.myFun2(true);

  const notification = useNotification();
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
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
    notification.error(data?.message || "Something went wrong!", 3000);
  };

  const handleGetProductDetails = () => {
    setLoading(true);
    fetchApi(
      "GET",
      "https://dummyjson.com",
      `products/${from}`,
      handleResponseGetProductDetails,
      handleError
    );
  };

  const notifySuccess = () => {
    addItem(products);
    notification.success("Product added to cart!", 3000);
  };

  const notifyError = () => {
    setTimeout(() => {
      navigate("/login");
    }, 500);
    notification.error("Vui lòng đăng nhập để tiếp tục!", 3000);
  };

  const handleAddItem = () => {
    token !== null ? notifySuccess() : notifyError();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === products?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? products?.images?.length - 1 : prev - 1
    );
  };

  const nextSuggestion = () => {
    setSuggestionIndex((prev) => prev + 3);
  };

  const prevSuggestion = () => {
    setSuggestionIndex((prev) => Math.max(0, prev - 3));
  };

  const discountPrice = products?.price
    ? products.price -
      Math.round((products.price * products.discountPercentage) / 100)
    : 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    handleGetProductDetails();
  }, [from]);

  useEffect(() => {
    if (products?.category) {
      handleGetCategoryProducts();
    }
  }, [products?.category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading product details..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative bg-gray-50  rounded-2xl p-8 overflow-hidden">
            {products?.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-lg">
                  <span className="text-sm font-bold flex items-center gap-1">
                    <span className="text-yellow-300">⚡</span>-
                    {Math.round(products.discountPercentage)}%
                  </span>
                </div>
              </div>
            )}

            {products?.images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <img
              src={products?.images?.[currentImageIndex]}
              alt={products?.title}
              className="w-full h-96 object-contain mx-auto"
            />
          </div>

          {products?.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {products.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${products.title} ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {products?.title}
            </h1>
            {products?.brand && (
              <p className="text-lg text-blue-600 font-medium">
                Brand: {products.brand}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Rate
              disabled
              defaultValue={products?.rating}
              className="text-yellow-400"
            />
            <span className="text-gray-600">
              ({products?.rating}/5 • {products?.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="bg-gray-50  p-4 rounded-xl">
            <div className="flex items-center gap-3">
              {products?.discountPercentage > 0 && (
                <span className="text-gray-400 line-through text-xl">
                  ${Number(products.price).toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-red-500">
                ${Number(discountPrice).toFixed(2)}
              </span>
              {products?.discountPercentage > 0 && (
                <p className="text-sm font-bold text-green-600 bg-green-100 px-3 py-2 rounded-lg mt-1 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-600" /> Save{" "}
                  {Number(products.price - discountPrice).toFixed(2)}$
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Package className="w-5 h-5 text-gray-700 font-bold" />
              <span className="text-gray-700 font-semibold">
                {products?.availabilityStatus || "In Stock"} • {products?.stock}{" "}
                products
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Product description</h3>
            <p className="text-gray-600 leading-relaxed">
              {products?.description}
            </p>
          </div>

          <div className="grid grid-cols-11 gap-4">
            {products?.shippingInformation && (
              <div className="col-span-6 bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Shipping{" "}
                  <span className="font-semibold">
                    {products.shippingInformation}
                  </span>
                </p>
              </div>
            )}

            {products?.warrantyInformation && (
              <div className="col-span-5 bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Warranty{" "}
                  <span className="font-semibold">
                    {products.warrantyInformation}
                  </span>
                </p>
              </div>
            )}
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
      </div>

      {products?.reviews && products.reviews.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5" /> Customer reviews (
            {products.reviews.length})
          </h2>
          <div className="space-y-4">
            {products.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </p>
                      <div className="flex items-center gap-2">
                        <Rate
                          disabled
                          defaultValue={review.rating}
                          size="small"
                        />
                        <span className="text-sm text-gray-500">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {newProductsSuggestion && newProductsSuggestion.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5" /> Related products
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevSuggestion}
                disabled={suggestionIndex === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSuggestion}
                disabled={suggestionIndex + 4 >= newProductsSuggestion.length}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProductsSuggestion
              .slice(suggestionIndex, suggestionIndex + 4)
              .map((element) => {
                const suggestionDiscountPrice =
                  element.price -
                  Math.round(
                    (element.price * element.discountPercentage) / 100
                  );

                return (
                  <div
                    key={element.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <Link
                      to={`/productDetails/${element.id}`}
                      state={{ from: element.id }}
                    >
                      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                        {element.discountPercentage > 0 && (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              <span className="text-yellow-300">⚡</span>-
                              {Math.round(products.discountPercentage)}%
                            </span>
                          </div>
                        )}
                        <img
                          src={element.images[0]}
                          alt={element.title}
                          className="w-full h-40 object-contain mx-auto"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                          {element.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-3">
                          {element.discountPercentage > 0 && (
                            <span className="text-gray-400 line-through text-sm">
                              ${Number(element.price).toFixed(2)}
                            </span>
                          )}
                          <span className="text-xl font-bold text-red-500">
                            ${Number(suggestionDiscountPrice).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Rate
                            disabled
                            defaultValue={element.rating}
                            size="small"
                          />
                          <span className="text-xs text-gray-500">
                            ({element.rating})
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
