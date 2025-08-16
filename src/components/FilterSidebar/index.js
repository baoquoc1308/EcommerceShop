import React, { useState } from "react";
import { ChevronDown, Filter, X, SortAsc, Boxes, Coins } from "lucide-react";

const FilterSidebar = ({
  onCategoryFilter,
  onPriceFilter,
  onSortChange,
  selectedCategories,
  selectedPriceRanges,
  selectedSort,
  isMobileOpen,
  onMobileClose,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    categories: true,
    priceRange: true,
  });

  const sortOptions = [
    { value: "", label: "Default Sorting" },
    { value: "lowToHigh", label: "Price: Low to High" },
    { value: "highToLow", label: "Price: High to Low" },
    { value: "nameAZ", label: "Name: A to Z" },
    { value: "nameZA", label: "Name: Z to A" },
    { value: "ratingHigh", label: "Rating: High to Low" },
  ];

  const categories = [
    { value: "beauty", label: "Beauty", count: 12 },
    { value: "fragrances", label: "Fragrances", count: 8 },
    { value: "furniture", label: "Furniture", count: 15 },
    { value: "groceries", label: "Groceries", count: 20 },
    { value: "home-decoration", label: "Home Decoration", count: 7 },
    { value: "kitchen-accessories", label: "Kitchen Accessories", count: 9 },
    { value: "laptops", label: "Laptops", count: 11 },
    { value: "mens-shirts", label: "Men's Shirts", count: 6 },
    { value: "mens-shoes", label: "Men's Shoes", count: 8 },
    { value: "mens-watches", label: "Men's Watches", count: 5 },
    { value: "mobile-accessories", label: "Mobile Accessories", count: 13 },
    { value: "motorcycle", label: "Motorcycle", count: 3 },
    { value: "skin-care", label: "Skin Care", count: 10 },
    { value: "smartphones", label: "Smartphones", count: 14 },
    { value: "sports-accessories", label: "Sports Accessories", count: 7 },
    { value: "sunglasses", label: "Sunglasses", count: 4 },
    { value: "tablets", label: "Tablets", count: 6 },
    { value: "tops", label: "Tops", count: 9 },
    { value: "vehicle", label: "Vehicle", count: 2 },
    { value: "womens-bags", label: "Women's Bags", count: 8 },
    { value: "womens-dresses", label: "Women's Dresses", count: 12 },
    { value: "womens-jewellery", label: "Women's Jewellery", count: 7 },
    { value: "womens-shoes", label: "Women's Shoes", count: 10 },
    { value: "womens-watches", label: "Women's Watches", count: 5 },
  ];

  const priceRanges = [
    { value: "0-25", label: "Under $25", min: 0, max: 25 },
    { value: "25-50", label: "$25 - $50", min: 25, max: 50 },
    { value: "50-100", label: "$50 - $100", min: 50, max: 100 },
    { value: "100-200", label: "$100 - $200", min: 100, max: 200 },
    { value: "200-500", label: "$200 - $500", min: 200, max: 500 },
    { value: "500+", label: "Over $500", min: 500, max: Infinity },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryValue) => {
    onCategoryFilter(categoryValue);
  };

  const handlePriceChange = (priceRange) => {
    onPriceFilter(priceRange);
  };

  const handleSortChange = (sortValue) => {
    onSortChange(sortValue);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 lg:hidden ${
          isMobileOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
      />

<div
        className={`
            fixed lg:sticky top-0 left-0 h-screen lg:h-screen lg:max-h-screen
            w-80 bg-white border-r border-gray-200 overflow-y-auto z-50
            transform transition-all duration-500 ease-out
            ${
              isMobileOpen
                ? "translate-x-0 shadow-2xl"
                : "-translate-x-full lg:translate-x-0 lg:shadow-none"
            }
            lg:transform-none
          `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Filter className="w-5 h-5 text-blue-600" />
            Filters
          </h2>
          <button
            onClick={onMobileClose}
            className="p-2 hover:bg-white rounded-xl transition-colors duration-200 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden lg:block p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <button
              onClick={() => toggleSection("sort")}
              className="group flex items-center justify-between w-full text-left font-semibold text-black mb-3 bg-purple-200 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-black group-hover:text-purple-600 shrink-0" />
                <span className="text-base leading-[1.25rem] text-black group-hover:text-purple-600">
                  Sort By
                </span>
              </span>
              <div
                className={`transform transition-transform duration-300 ${
                  expandedSections.sort ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4 text-black group-hover:text-purple-600" />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections.sort
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
                {sortOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-purple-50 p-2.5 rounded-xl group transition-all duration-200 border border-transparent hover:border-purple-100"
                  >
                    <input
                      type="checkbox"
                      name="sort"
                      value={option.value}
                      checked={selectedSort === option.value}
                      onChange={() => handleSortChange(option.value)}
                      className="w-4 h-4 accent-purple-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => toggleSection("categories")}
              className="group flex items-center justify-between w-full text-left font-semibold text-black mb-3 bg-blue-200 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-black group-hover:text-blue-600 shrink-0" />
                <span className="text-base leading-[1.25rem] text-black group-hover:text-blue-600">
                  Categories
                </span>
              </span>

              <div
                className={`transform transition-transform duration-300 ${
                  expandedSections.categories ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4 text-black group-hover:text-blue-600" />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections.categories
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-blue-50 p-2.5 rounded-xl group transition-all duration-200 border border-transparent hover:border-blue-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.value)}
                      onChange={() => handleCategoryChange(category.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => toggleSection("priceRange")}
              className="group flex items-center justify-between w-full text-left font-semibold text-black mb-3 bg-green-200 hover:text-green-600 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-black group-hover:text-green-600 shrink-0" />
                <span className="text-base leading-[1.25rem] text-black group-hover:text-green-600">
                  Price Range
                </span>
              </span>
              <div
                className={`transform transition-transform duration-300 ${
                  expandedSections.priceRange ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4 text-black group-hover:text-green-600" />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections.priceRange
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-1">
                {priceRanges.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 p-2.5 rounded-xl group transition-all duration-200 border border-transparent hover:border-green-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handlePriceChange(range.value)}
                      className="w-4 h-4 accent-green-600 rounded focus:ring-green-500 focus:ring-2"
                    />

                    <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
