import React from "react";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineSearch,

} from "react-icons/ai";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import logo from "./images/logo.png";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Navbar(props) {
  //assigning location variable
  const location = useLocation();

  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Sử dụng hiệu ứng trơn tru
    });
  };



  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const { totalUniqueItems } = useCart();

  const [Icon, setIcon] = useState(<AiOutlineMenu size={25} />);
  const [Margin, setMargin] = useState("-mt-40");
  const [searchInput, setSearchInput] = useState("");


  const responsiveMenu = () => {
    if (Margin === "-mt-40") {
      setMargin("mt-0");
      setIcon(<AiOutlineClose size={25} />);
    } else {
      setMargin("-mt-40");
      setIcon(<AiOutlineMenu size={25} />);
    }
  };
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (searchInput) {
      console.log("Performing search for:", searchInput);
    }
  };

  return (
    <div className="">
      <nav className="flex flex-col fixed  top-0  min-w-full shadow-md z-50">
        <ul
          className={`flex flex-row p-3  z-30 ${props.mode === "dark" ? "text-white bg-gray-500" : "bg-gray-200"}`
          }
        >
          <label htmlFor="" className="mx-3 cursor-pointer">
            <img src={logo} alt="" className="w-10 h-9" onClick={scrollToTop}/>
          </label>

          <ul className="hidden  sm:flex ml-8 mt-1 text-lg">
            <NavLink to="/" className="mx-6">
              <li className={`hover:border-b-4 border-orange-300 ${splitLocation[1] === "" ? "border-b-4" : ""}`}>Home </li>
            </NavLink>
            <NavLink to="/collection" className="mx-6">
              <li className={`hover:border-b-4 border-orange-300 active:border-b-4 ${splitLocation[1] === "collection" ? "border-b-4" : ""} `}>Collection </li>
            </NavLink>
            <NavLink to="/login" className="mx-6">
              <li className={`hover:border-b-4 border-orange-300 active:border-b-4 ${splitLocation[1] === "login" ? "border-b-4" : ""} `}>Login </li>
            </NavLink>
            <NavLink to="/contact" className="mx-6"> {/* Thêm liên kết đến trang "Contact" */}
              <li className={`hover:border-b-4 border-orange-300 ${splitLocation[1] === "contact" ? "border-b-4" : ""}`}>Contact </li>
            </NavLink>
            <NavLink to="/sale-off" className="mx-6"> {/* Thêm liên kết đến trang "Sale Off" */}
              <li className={`hover:border-b-4 border-orange-300 ${splitLocation[1] === "sale-off" ? "border-b-4" : ""}`}>Sale Off </li>
            </NavLink>
            <NavLink to="/Policy" className="mx-6"> {/* Thêm liên kết đến trang "Sale Off" */}
              <li className={`hover:border-b-4 border-orange-300 ${splitLocation[1] === "policy" ? "border-b-4" : ""}`}>Policy </li>
            </NavLink>
            <NavLink to="/Introduce" className="mx-6"> {/* Thêm liên kết đến trang "Sale Off" */}
              <li className={`hover:border-b-4 border-orange-300 ${splitLocation[1] === "introduce" ? "border-b-4" : ""}`}>Introduce </li>
            </NavLink>

            <div className="ml-auto mx-6 mt-2 flex items-center relative cursor-pointer">
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={handleInputChange}
                className={`border border-gray-300 p-1 rounded-md pl-10 ${props.mode === "dark" ? "text-white bg-gray-500" : "bg-gray-200"}`}
              />
              <AiOutlineSearch className="absolute left-3 top-2 text-gray-500" />
              <button
                onClick={handleSearch}
                className={`ml-2 text-gray-500 hover:text-gray-700 cursor-pointer ${props.mode === "dark" ? "text-white" : ""}`}
              >
              </button>
            </div>
          </ul>

          <li className="ml-auto mx-6 mt-2 relative cursor-pointer">
            <NavLink to="/cart">
              <AiOutlineShoppingCart size={25} />
              <span className="absolute -top-2 ml-5 z-10 bg-orange-300 rounded-full px-1">
                {totalUniqueItems}
              </span>
            </NavLink>
          </li>


          <li className="mx-2 mt-2 cursor-pointer" onClick={props.toggleMode}>
            {props.mode === "dark" ? (
              <BsSun size={25} />
            ) : (
              <BsFillMoonFill size={25} />
            )}
          </li>
          <li
            className="mx-2 cursor-pointer sm:hidden mt-2"
            onClick={responsiveMenu}
          >
            {Icon}
          </li>
        </ul>


        <ul
          className={`flex flex-col ml-auto space-y-3 bg-slate-100 transition-all w-full p-3 z-10 ${Margin} duration-500 sm:hidden text-lg ${props.mode === "dark" ? "text-white bg-gray-600" : "bg-gray-200"
            }`}
        >
          <NavLink to="/" className="ml-auto font-semibold text-xl">
            <li onClick={responsiveMenu}>Home </li>
          </NavLink>
          <NavLink to="/collection" className="ml-auto font-semibold text-xl">
            <li onClick={responsiveMenu}>Collection </li>
          </NavLink>
          <NavLink to="/login" className="ml-auto font-semibold text-xl">
            <li onClick={responsiveMenu}>Login </li>
          </NavLink>
          <NavLink to="/contact" className="ml-auto font-semibold text-xl"> {/* Thêm liên kết đến trang "Contact" */}
            <li onClick={responsiveMenu}>Contact </li>
          </NavLink>
          <NavLink to="/sale-off" className="ml-auto font-semibold text-xl"> {/* Thêm liên kết đến trang "Sale Off" */}
            <li onClick={responsiveMenu}>Sale Off </li>
          </NavLink>
          <NavLink to="/policy" className="mx-6">
            <li className="hover:border-b-4 border-orange-300">Policy </li>
          </NavLink>
          <NavLink to="/introduce" className="mx-6">
            <li className="hover:border-b-4 border-orange-300">Introduce </li>
          </NavLink>
        </ul>
        {/* {showScrollToTopButton && (
          <div
            className={`scroll-to-top-button ${props.mode === "dark" ? "text-white bg-gray-500" : "bg-gray-200"}`}
            onClick={scrollToTop}
          >
            Scroll To Top
          </div>
        )} */}
      </nav>
    </div>
  );
}

export default Navbar;
