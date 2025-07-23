import emailjs from "@emailjs/browser";
import "../Contact/index.scss";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Contact = (props) => {
  props.myFun(false);
  props.myFun2(true);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    user_name: false,
    user_email: false,
    user_phone: false,
    message: false,
  });

  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm(
          "service_va09e9v",
          "template_shpr2ts",

          form.current,
          "9v1RiOXzBjvQ_2cDp"
        )

        .then(
          (result) => {
            toast.success("Gửi thành công!", {
              position: "top-right",
              autoClose: 1500,
            });

            setFormData({
              user_name: "",
              user_email: "",
              user_phone: "",
              message: "",
            });

            setTimeout(() => {
              navigate("/");
            }, 1500);
          },

          (error) => {
            console.log(error.text);
          }
        );
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin và đúng định dạng email.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const validateForm = () => {
    const errors = {
      user_name: !formData.user_name.trim(),
      user_email: !isValidEmail(formData.user_email),
      user_phone: !isValidPhoneNumber(formData.user_phone),
      message: !formData.message.trim(),
    };

    setFormErrors(errors);

    return !Object.values(errors).some(Boolean);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;

    return phoneRegex.test(phoneNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "user_email") {
      setFormErrors({
        ...formErrors,
        [e.target.name]: !isValidEmail(e.target.value),
      });
    } else if (e.target.name === "user_phone") {
      setFormErrors({
        ...formErrors,
        [e.target.name]: !isValidPhoneNumber(e.target.value),
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: !e.target.value.trim(),
      });
    }
  };

  const googleMapsURL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220235.78631011717!2d106.52803673028657!3d10.828039308819054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a3f1b2e8bfb%3A0xb3c9b77dcc25ebc7!2zU2nDqnUgdGjhu4sgVGjhur8gR2nhu5tpIERpIMSQ4buZbmc!5e0!3m2!1svi!2s!4v1691831495590!5m2!1svi!2s";

  return (
    <div className="checkout-container">
      <div className="google-map">
        <iframe
          title="Google Map"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={googleMapsURL}
          allowFullScreen
        ></iframe>
      </div>
      <div className="checkout-form-contact">
        <form ref={form} onSubmit={sendEmail}>
          <label>Họ và tên</label>
          <input
            type="text"
            name="user_name"
            placeholder="Nhập tên đầy đủ..."
            value={formData.user_name}
            onChange={handleChange}
          />
          {formErrors.user_name && (
            <p className="error-message">Vui lòng nhập họ và tên.</p>
          )}
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Nhập email..."
            value={formData.user_email}
            onChange={handleChange}
          />
          {formErrors.user_email && (
            <p className="error-message">
              Vui lòng nhập định dạng email hợp lệ.
            </p>
          )}
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="user_phone"
            placeholder="Nhập số điện thoại..."
            value={formData.user_phone}
            onChange={handleChange}
          />
          {formErrors.user_phone && (
            <p className="error-message">Vui lòng nhập số điện thoại hợp lệ.</p>
          )}

          <label>Nội dung</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {formErrors.message && (
            <p className="error-message">Vui lòng nhập nội dung.</p>
          )}
          <input
            type="submit"
            value="Send"
            disabled={Object.values(formErrors).some(Boolean)}
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
