import React from "react";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";

function Footer(props) {
  return (
    <div
      className={`${props.mode === "dark" ? "bg-gray-500" : "bg-gray-100"} p-6`}
    >
      <h1 className="lg:hidden lg:text-2xl text-xl font-semibold mb-2">
        {" "}
        Follow Me On{" "}
      </h1>
      <div
        className={`flex ${
          props.mode === "dark" ? "bg-gray-400 text-black" : "bg-gray-300 "
        } py-3`}
      >
        <h1 className="text-lg font-semibold hidden lg:inline-block px-3  lg:text-xl ">
          Follow Me On
        </h1>
        <div className="lg:ml-auto grid grid-cols-4 gap-x-16 lg:gap-x-0 px-2">
        <a href="https://www.facebook.com/baoquoc.haga.21">
            <AiFillFacebook className="mx-auto lg:mx-5" size={24} />
          </a>
          <a href="https://www.instagram.com/baoquoc.haga.21/">
            <AiOutlineInstagram className="mx-auto lg:mx-5" size={24} />
          </a>
          <a href="https://twitter.com/bao_quoc_ho">
            <AiFillTwitterCircle className="mx-auto lg:mx-5" size={24} />
          </a>
          <a href="https://github.com/baoquoc1308">
            <AiFillGithub className="mx-auto lg:mx-5" size={24} />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-center   sm:text-left gap-x-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 my-6  font-light ">
        <div className="my-2 text-lg sm:mx-auto">
          <h1 className="text-xl font-semibold my-2">My Account</h1>
          <h1>Products</h1>
          <h1>Category</h1>
          <h1>Men</h1>
          <h1>Women</h1>
        </div>
        <div className="my-2 text-lg sm:mx-auto">
          <h1 className="text-xl font-semibold my-2">Ecommerce Shop</h1>
          <h1>Pricing</h1>
          <h1>Cart</h1>
          <h1>Collection</h1>
          <h1>Buy now</h1>
        </div>
        <div className="my-2 text-lg sm:mx-auto">
          <h1 className="text-xl font-semibold my-2">Customer Care</h1>
          <h1>baoquochoa2@gmail.com</h1>
          <h1>Phone 1: 0329 080 926</h1>
          <h1>Phone 2: 0328 620 676</h1>
          <h1>Phone 3: 0906 723 862</h1>
        </div>
        <div className="my-2 text-lg sm:mx-auto">
          <h1 className="text-xl font-semibold my-2">Products</h1>
          <h1>Smartphone</h1>
          <h1>Laptop</h1>
          <h1>Mens-watches</h1>
          <h1>Womens-watches</h1>
        </div>
      </div>
      <div
        className={`${
          props.mode === "dark" ? "bg-gray-400 text-black" : "bg-gray-300 "
        } text-center py-3`}
      >
        <h1>
          &copy; 2023 <b>Ecommerce Shop</b> <br />
          &reg; All right reserved{" "}
        </h1>
      </div>
    </div>
  );
}

export default Footer;
