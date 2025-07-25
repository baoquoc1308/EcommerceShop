import React from "react";
import "../Footer/index.scss";
import {
  FaPiggyBank,
  FaShippingFast,
  FaHeadphonesAlt,
  FaWallet,
} from "react-icons/fa";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="left-box">
            <div className="box">
              <div className="icon_box">
                <FaPiggyBank />
              </div>
              <div className="detail">
                <h3>Great Saving</h3>
                <p>Tiết kiệm tuyệt vời</p>
              </div>
            </div>
            <div className="box">
              <div className="icon_box">
                <FaShippingFast />
              </div>
              <div className="detail">
                <h3>free delivery</h3>
                <p>Giao hàng miễn phí</p>
              </div>
            </div>
            <div className="box">
              <div className="icon_box">
                <FaHeadphonesAlt />
              </div>
              <div className="detail">
                <h3>24X7 support</h3>
                <p>Hỗ trợ 24/7</p>
              </div>
            </div>
            <div className="box">
              <div className="icon_box">
                <FaWallet />
              </div>
              <div className="detail">
                <h3>money back</h3>
                <p>Hoàn tiền nếu sản phẩm lỗi</p>
              </div>
            </div>
          </div>
          <div className="right_box">
            <div className="header">
              <img src="image/logo.webp" alt=""></img>
              <p>Sáng tạo vô hạn, lựa chọn không giới hạn.</p>
              <p> Sản phẩm tốt - Giá trị tốt.</p>
            </div>
            <div className="bottom">
              <div className="box">
                <h3>Your Account</h3>
                <ul>
                  <li>About us</li>
                  <li>Account</li>
                  <li>Payment</li>
                  <li>sales</li>
                </ul>
              </div>
              <div className="box">
                <h3>Products</h3>
                <ul>
                  <li>
                    <a href="/">Featured Products</a>
                  </li>
                  <li>
                    <a href="/collection">Collection</a>
                  </li>
                  <li>
                    <a href="/cart">Cart</a>
                  </li>
                  <li>
                    <a href="/checkout">Checkout</a>
                  </li>
                </ul>
              </div>
              <div className="box">
                <h3>contact us</h3>
                <ul>
                  <li>Tô Ký ,Trung Mỹ Tây, Quận 12, TP. HCM</li>
                  <li>0329 080 926</li>
                  <li>baoquochoa2@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="follow-me">
              <div className="follow-me-container">
                <h1>Follow Me On</h1>
                <div className="icon">
                  <a href="https://www.facebook.com/baoquoc.haga.21">
                    <AiFillFacebook />
                  </a>
                  <a href="https://www.instagram.com/baoquoc.haga.21/">
                    <AiOutlineInstagram />
                  </a>
                  <a href="https://twitter.com/bao_quoc_ho">
                    <AiFillTwitterCircle />
                  </a>
                  <a href="https://github.com/baoquoc1308">
                    <AiFillGithub />
                  </a>
                </div>
              </div>
            </div>

            <div className="infor">
              <h1>
                &copy; 2025 <b>Ecommerce Shop</b> <br />
                &reg; All right reserved{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
