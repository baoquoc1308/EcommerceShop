import React, { useState } from "react";
import "./CheckoutForm.css";
import { Alert, Button, Input } from "antd";
import { Form } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useEffect } from "react";

const CheckoutForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { emptyCart, clearCartMetadata } = useCart();
  const infoUserJSON = localStorage.getItem("infoOrder");
  const infoUser = JSON.parse(infoUserJSON);

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

  {
    infoUser
      ? toast.success(
          "Bạn đã có thông tin cá nhân, bạn có muốn thay đổi không?",
          {
            position: "top-right",
            autoClose: 3000,
          }
        )
      : toast.warning("Vui lòng nhập thông tin cá nhân.", {
          position: "top-right",
          autoClose: 2000,
        });
  }

  const handleOnFinish = (values) => {
    localStorage.setItem("infoOrder", JSON.stringify(values));
    toast.success("Mua hàng thành công!", {
      position: "top-right",
      autoClose: 1500,
    });

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
        <div className="address-company">{/* <FilterLocation /> */}</div>
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