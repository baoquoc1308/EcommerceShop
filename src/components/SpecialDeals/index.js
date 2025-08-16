import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProductItems from "../ProductItems";
import Spinner from "../Spinner";
import { fetchApi } from "../../api/api";
import { useNotification } from "../Notification";
import { Percent, TrendingDown, Star, Clock } from "lucide-react";
import "./index.scss";

function SpecialDeals(props) {
  props.myFun(true);
  props.myFun2(true);

  const notification = useNotification();
  const [allProducts, setAllProducts] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  const specialDealsProducts = useMemo(() => {
    if (!allProducts?.products?.length) {
      return [];
    }

    return allProducts.products
      .map((product) => ({
        ...product,
        discountAmount: product.discountPercentage || 0,
      }))
      .filter((product) => product.discountAmount > 10) 
      .sort((a, b) => b.discountAmount - a.discountAmount) 
      .slice(0, 20); 
  }, [allProducts]);

  const handleResponseGetAllProducts = useCallback((data) => {
    const filtered = {
      ...data,
      products: data.products.filter(
        (item) =>
          item.id !== 2 &&
          item.id !== 7 &&
          item.id !== 61 &&
          item.id !== 75 &&
          item.id !== 85 &&
          item.id !== 100
      ),
    };
    setAllProducts(filtered);
    setLoading(false);
  }, []);

  const handleError = useCallback((data) => {
    console.error("API Error:", data);
    notification.error(data?.message || "Something went wrong!", 3000);
    setLoading(false);
  }, [notification]);

  const fetchAllProducts = useCallback(() => {
    setLoading(true);
    fetchApi(
      "GET",
      "https://dummyjson.com",
      "products?limit=194",
      handleResponseGetAllProducts,
      handleError
    );
  }, [handleResponseGetAllProducts, handleError]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  const stats = useMemo(() => {
    if (!specialDealsProducts.length) return {};

    const avgDiscount =
      specialDealsProducts.reduce((sum, p) => sum + p.discountAmount, 0) /
      specialDealsProducts.length;
    const maxDiscount = Math.max(
      ...specialDealsProducts.map((p) => p.discountAmount)
    );
    const totalSavings = specialDealsProducts.reduce(
      (sum, p) => sum + (p.price * p.discountAmount) / 100,
      0
    );

    return { avgDiscount, maxDiscount, totalSavings };
  }, [specialDealsProducts]);

  return (
    <div className="special-deals-container min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-20">
      <div className="hero-section bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Percent className="w-12 h-12 mr-3 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-bold">Special Deals</h1>
          </div>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            🔥 Amazing discounts up to {stats.maxDiscount?.toFixed(0)}% OFF!
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <TrendingDown className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {stats.avgDiscount?.toFixed(1)}%
              </div>
              <div className="text-sm opacity-80">Avg Discount</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {specialDealsProducts.length}
              </div>
              <div className="text-sm opacity-80">Hot Deals</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">Limited</div>
              <div className="text-sm opacity-80">Time Only</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🔥 Best Deals Available Now
          </h2>
          <p className="text-gray-600 text-lg">
            Don't miss out! These incredible offers won't last long.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : specialDealsProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {specialDealsProducts.map((product, index) => (
              <div key={product.id} className="relative group">
                {index < 3 && (
                  <div className="absolute -top-2 -left-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    #{index + 1} HOT 🔥
                  </div>
                )}

                <ProductItems
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  description={product.description}
                  image={product?.images[0]}
                  addToCart={props.addToCart}
                  item={product}
                  discount={product.discountAmount}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Percent className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No special deals available
            </h3>
            <p className="text-gray-600">
              Check back later for amazing offers!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecialDeals;
