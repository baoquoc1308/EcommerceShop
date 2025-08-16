import Products from "./components/Products";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProductDetails from "./components/ProductDetails/index";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "react-use-cart";
import Footer from "./components/Footer/index";
import SpecialDeals from "./components/SpecialDeals";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import CheckoutForm from "./components/CheckoutForm";
import Contact from "./components/Contact";
import Slider from "./components/Slider";
import {
  NotificationContainer,
  useNotification,
} from "./components/Notification";

function App() {
  const location = useLocation();
  const [showSlide, setshowSlide] = useState(false);
  const [showFooter, setshowFooter] = useState(true);
  const [Mode, setMode] = useState("light");
  const notification = useNotification();

  const isHomePage = location.pathname === "/" && showSlide;

  const setDarkLight = () => {
    if (Mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "rgb(203 ,213 ,225) ";
    }
  };

  return (
    <>
      <NotificationContainer
        notifications={notification.notifications}
        removeNotification={notification.removeNotification}
      />
      <CartProvider>
        <Navbar toggleMode={setDarkLight} mode={Mode} />

        {isHomePage && (
          <div className="slider-container">
            <Slider mode={Mode} />
          </div>
        )}

        <Routes>
          <Route
            path="/productDetails/:id"
            element={
              <ProductDetails
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />

          <Route
            path="/"
            element={
              <Products
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart mode={Mode} myFun={setshowSlide} myFun2={setshowFooter} />
            }
          />
          <Route
            path="/special-deals"
            element={
              <SpecialDeals
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />
          <Route
            path="/blog"
            element={
              <Blog mode={Mode} myFun={setshowSlide} myFun2={setshowFooter} />
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <BlogPost
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login mode={Mode} myFun={setshowSlide} myFun2={setshowFooter} />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />
          <Route
            path="/checkoutform"
            element={
              <CheckoutForm
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                mode={Mode}
                myFun={setshowSlide}
                myFun2={setshowFooter}
              />
            }
          />
        </Routes>
      </CartProvider>
      {showFooter && <Footer mode={Mode} />}
    </>
  );
}

export default App;
