import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import AvatarDropdown from "../Logout/index";
import "./index.scss";

function Navbar() {

  const { totalUniqueItems } = useCart();
  const token = localStorage.getItem("accessToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navItems = [
    { path: "/", label: "Home", key: "" },
    { path: "/special-deals", label: "Special Deals", key: "special-deals" },
    { path: "/blog", label: "Blog", key: "blog" },
    { path: "/contact", label: "Contact", key: "contact" },
    { path: "/checkout", label: "Order", key: "checkout" },
  ];

  return (
    <nav className="navbar-container fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 z-[100]">
      <div className="navbar-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0 cursor-pointer" onClick={scrollToTop}>
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 transition-transform duration-300 hover:scale-110"
            />
          </div>

          
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 group ${
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-all duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            
            <NavLink
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <AiOutlineShoppingCart
                size={24}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              {totalUniqueItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {token !== null ? totalUniqueItems : 0}
                </span>
              )}
            </NavLink>

            
            {!token ? (
              <NavLink
                to="/login"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Login
              </NavLink>
            ) : (
              <div className="ml-2">
                <AvatarDropdown />
              </div>
            )}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="flex items-center justify-between px-3 pt-4 border-t border-gray-200">
              <NavLink
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <AiOutlineShoppingCart size={20} />
                <span>Cart ({token !== null ? totalUniqueItems : 0})</span>
              </NavLink>

              {!token ? (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Login
                </NavLink>
              ) : (
                <AvatarDropdown />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
