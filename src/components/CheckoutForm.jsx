import React, { useState } from "react";
import './CheckoutForm.css'
import { Button, Input } from "antd";
import { Form } from 'antd';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate();
  const handleOnFinish = (values) => {
    localStorage.setItem('infoOrder', JSON.stringify(values))
    toast.success('Mua hàng thành công!', {
      position: "top-right",
      autoClose: 1500,
    })

    setTimeout(() => {
      navigate('/checkout')
    }, 1500);
  }

  return (
    <div className="checkout-form">
        <Form
          form={form}
          name="login-form"
          onFinish={handleOnFinish}
        >
        <p className="form-title">THÔNG TIN KHÁCH HÀNG</p>
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please input your fullname!' }]}
        >
          <Input
            placeholder="Fullname"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="Address"
          rules={[{ required: true, message: 'Please input your Address!' }]}
        >
          <Input
            placeholder="Address"
          />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            // { validator: isValidPhoneNumber || "" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Notes"
          name="Notes"
          rules={[
            {
              required: true,
              message: "Please input Notes!"
            }
          ]}
        >
          <Input placeholder="Please input Notes" />
        </Form.Item>
        <div className="address-company">
          {/* <FilterLocation /> */}
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            MUA HÀNG
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CheckoutForm;
