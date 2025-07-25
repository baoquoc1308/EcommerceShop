import React, { useEffect, useState } from "react";
import "../CheckoutForm/index.scss";
import { Button, Input } from "antd";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useNotification } from "../Notification";
const CheckoutForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { emptyCart, clearCartMetadata } = useCart();
  const notification = useNotification();
  const infoUserJSON = localStorage.getItem("infoOrder");

  const infoUser = JSON.parse(infoUserJSON);
  const [reload, setReload] = useState(false);

  const isValidFullName = (rule, value) => {
    if (!value) {
      return Promise.reject("");
    } else {
      const words = value.split(" ");

      const isCapitalized = words.every((word) => {
        const firstLetter = word.charAt(0);

        return firstLetter === firstLetter.toUpperCase();
      });

      if (!isCapitalized) {
        return Promise.reject(
          "The first letter of each word must be capitalized."
        );
      }

      if (value.length > 100) {
        return Promise.reject("Full name must not exceed 100 characters.");
      }
    }

    return Promise.resolve();
  };

  const isValidPhoneNumber = (rule, value) => {
    if (!value) {
      return Promise.reject("");
    } else if (!/^\d{10}$/.test(value)) {
      return Promise.reject("Phone number must be exactly 10 digits long.");
    }

    return Promise.resolve();
  };

  const clearCart = () => {
    emptyCart();

    clearCartMetadata();
  };

  useEffect(() => {
    !!infoUser &&
      reload &&
      notification.success(
        "You already have personal information, do you want to change it?",
        3000
      );

    infoUser === null &&
      reload &&
      notification.warning("Please enter personal information.", 3000);
  }, [reload]);

  useEffect(() => {
    setReload(true);
  }, [infoUser, reload]);

  const handleOnFinish = (values) => {
    localStorage.setItem("infoOrder", JSON.stringify(values));
    notification.success("Purchase successful!", 3000);

    setTimeout(() => {
      navigate("/checkout");
      clearCart();
    }, 1500);
  };

  return (
    <div className="checkout-form">
      <Form
        form={form}
        name="login-form"
        onFinish={handleOnFinish}
        initialValues={infoUser}
      >
        <p className="form-title">THÔNG TIN KHÁCH HÀNG</p>
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[
            { required: true, message: "Please input your full name!" },
            { validator: isValidFullName },
          ]}
        >
          <Input placeholder="Fullname" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your Address!" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            { validator: isValidPhoneNumber },
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          label="Notes"
          name="notes"
          rules={[
            {
              required: true,
              message: "Please input Notes!",
            },
          ]}
        >
          <Input placeholder="Please input Notes" />
        </Form.Item>
        <div className="address-company"></div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            MUA HÀNG
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckoutForm;
