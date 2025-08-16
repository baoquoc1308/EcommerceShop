import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProductItems from "../ProductItems";
import Spinner from "../Spinner";
import FilterSidebar from "../FilterSidebar";
import { fetchApi } from "../../api/api";
import { useNotification } from "../Notification";
import { Filter, Search, X } from "lucide-react";

function Products(props) {
  props.myFun(true);
  props.myFun2(true);

  const notification = useNotification();

  const [allProducts, setAllProducts] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSortChange = useCallback((value) => {
    setSortOption(value);
  }, []);
  const filteredProducts = useMemo(() => {
    if (!allProducts?.products?.length) {
      return { products: [] };
    }

    let filtered = [...allProducts.products];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          (product.brand && product.brand.toLowerCase().includes(keyword))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        return selectedPriceRanges.some((range) => {
          switch (range) {
            case "0-25":
              return price <= 25;
            case "25-50":
              return price > 25 && price <= 50;
            case "50-100":
              return price > 50 && price <= 100;
            case "100-200":
              return price > 100 && price <= 200;
            case "200-500":
              return price > 200 && price <= 500;
            case "500+":
              return price > 500;
            default:
              return false;
          }
        });
      });
    }

    if (sortOption) {
      switch (sortOption) {
        case "lowToHigh":
          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "highToLow":
          filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "nameAZ":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "nameZA":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "ratingHigh":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return { products: filtered };
  }, [
    allProducts,
    searchKeyword,
    selectedCategories,
    selectedPriceRanges,
    sortOption,
  ]);

  const handleResponseGetAllProducts = useCallback((data) => {
    if (!data || !data.products || !Array.isArray(data.products)) {
      console.error("Invalid data structure:", data);
      setLoading(false);
      return;
    }

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

  const handleError = useCallback(
    (data) => {
      console.error("API Error:", data);
      notification.error(data?.message || "Something went wrong!", 3000);
      setLoading(false);
    },
    [notification]
  );

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

  const handleCategoryFilter = useCallback((categoryValue) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryValue)) {
        return prev.filter((cat) => cat !== categoryValue);
      } else {
        return [...prev, categoryValue];
      }
    });
  }, []);

  const handlePriceFilter = useCallback((priceRange) => {
    setSelectedPriceRanges((prev) => {
      if (prev.includes(priceRange)) {
        return prev.filter((range) => range !== priceRange);
      } else {
        return [...prev, priceRange];
      }
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearchKeyword("");
    setSortOption("");
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gray-50 pt-4"> 
      <div className="flex">
        <FilterSidebar
          onCategoryFilter={handleCategoryFilter}
          onPriceFilter={handlePriceFilter}
          onSortChange={handleSortChange}
          selectedCategories={selectedCategories}
          selectedPriceRanges={selectedPriceRanges}
          selectedSort={sortOption}
          onClearFilters={handleClearFilters}
          isMobileOpen={isMobileFilterOpen}
          onMobileClose={() => setIsMobileFilterOpen(false)}
        />
        <div className="flex-1 lg:ml-0">
          <div className="bg-white border-b border-gray-200 px-4 py-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 border border-blue-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filters</span>
                  </button>

                  <div>
                    <h1 className="text-2xl font-bold  text-amber-600 ">
                      FEATURED PRODUCTS
                    </h1>
                  </div>
                </div>
              </div>

              <div className="relative max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, description, category..."
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  className="block w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {(selectedCategories.length > 0 ||
                selectedPriceRanges.length > 0 ||
                searchKeyword.trim() ||
                sortOption) && (
                <div className="flex flex-wrap gap-2 items-center">
                  {searchKeyword.trim() && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 text-sm rounded-lg">
                      <span>Search: "{searchKeyword}"</span>
                      <button
                        onClick={() => setSearchKeyword("")}
                        className="w-4 h-4 flex items-center justify-center rounded-full border border-amber-300 bg-amber-200 hover:bg-amber-300 text-amber-600 hover:text-amber-800 transition-colors duration-150"
                        style={{ lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {sortOption && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 text-sm rounded-lg">
                      <span>Sort: {sortOption}</span>
                      <button
                        onClick={() => setSortOption("")}
                        className="w-4 h-4 flex items-center justify-center rounded-full border border-purple-300 bg-purple-200 hover:bg-purple-300 text-purple-600 hover:text-purple-800 transition-colors duration-150"
                        style={{ lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-lg"
                    >
                      <span>{category}</span>
                      <button
                        onClick={() => handleCategoryFilter(category)}
                        className="w-4 h-4 flex items-center justify-center rounded-full border border-blue-300 bg-blue-200 hover:bg-blue-300 text-blue-600 hover:text-blue-800 transition-colors duration-150"
                        style={{ lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {selectedPriceRanges.map((range) => (
                    <span
                      key={range}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-lg"
                    >
                      <span>
                        {range === "500+"
                          ? "Over $500"
                          : `$${range.replace("-", " - $")}`}
                      </span>
                      <button
                        onClick={() => handlePriceFilter(range)}
                        className="w-4 h-4 flex items-center justify-center rounded-full border border-green-300 bg-green-200 hover:bg-green-300 text-green-600 hover:text-green-800 transition-colors duration-150"
                        style={{ lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Clear All
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner />
              </div>
            ) : filteredProducts?.products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.products.map((element) => (
                  <ProductItems
                    key={element.id}
                    id={element.id}
                    title={element.title}
                    price={element.price}
                    category={element.category}
                    description={element.description}
                    image={element?.images[0]}
                    addToCart={props.addToCart}
                    item={element}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4 flex items-center justify-center">
                  <img
                    width="100"
                    height="100"
                    src="https://img.icons8.com/windows/100/no-data-availible.png"
                    alt="no-data-availible"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No data available
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or check back later
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
