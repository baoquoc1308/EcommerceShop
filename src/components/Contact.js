import React, { useState } from "react";
import './Contact.css'
import { Button, Input } from "antd";
import { Form } from 'antd';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

const Contact = (props) => {
  const googleMapsURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220235.78631011717!2d106.52803673028657!3d10.828039308819054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a3f1b2e8bfb%3A0xb3c9b77dcc25ebc7!2zU2nDqnUgdGjhu4sgVGjhur8gR2nhu5tpIERpIMSQ4buZbmc!5e0!3m2!1svi!2s!4v1691831495590!5m2!1svi!2s";
  const [form] = Form.useForm()
  const navigate = useNavigate();
  const isValidFullName = (rule, value) => {
    if (!value) {
      return Promise.reject('');
    } else {
      const words = value.split(' ');
      const isCapitalized = words.every(word => {
        const firstLetter = word.charAt(0);
        return firstLetter === firstLetter.toUpperCase();
      });

      if (!isCapitalized) {
        return Promise.reject('The first letter of each word must be capitalized.');
      }

      if (value.length > 100) {
        return Promise.reject('Full name must not exceed 100 characters.');
      }
    }
    return Promise.resolve();
  };
  const isValidPhoneNumber = (rule, value) => {
    if (!value) {
      return Promise.reject('');
    } else if (!/^\d{10}$/.test(value)) {
      return Promise.reject('Phone number must be exactly 10 digits long.');
    }
    return Promise.resolve();
  };
  const handleOnFinish = (values) => {
    localStorage.setItem('infoOrder', JSON.stringify(values))
    toast.success('Gửi thành công!', {
      position: "top-right",
      autoClose: 1500,
    })

    setTimeout(() => {
      navigate('/')
    }, 1500);
  }

  props.myFun(false)
  props.myFun2(true)

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
        <Form
          form={form}
          name="login-form"
          onFinish={handleOnFinish}
        >
          <p className="form-title">THÔNG TIN LIÊN HỆ</p>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { validator: isValidFullName },
            ]}

          >
            <Input
              placeholder="Fullname"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input your Email!' },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
            ]}
          >
            <Input
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              { validator: isValidPhoneNumber },
            ]}
          >
            <Input
              placeholder="Phone"
            />

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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              GỬI ĐI
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
