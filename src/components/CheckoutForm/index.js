import React, { useEffect, useState } from "react";
import "../CheckoutForm/index.scss";
import { Button, Input, Select } from "antd";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useNotification } from "../Notification";
import { Provinces } from "../../location/provinces";
import { Districts } from "../../location/districts";
import { Wards } from "../../location/wards";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Home,
  Building,
  Flag,
  FileText,
  ShoppingBag,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

const CheckoutForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const notification = useNotification();
  const infoUserJSON = localStorage.getItem("infoOrder");

  const infoUser = infoUserJSON ? JSON.parse(infoUserJSON) : null;
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [hasShownNotification, setHasShownNotification] = useState(false);

  const isValidFullName = (rule, value) => {
    if (!value) {
      return Promise.reject("Full name is required");
    }
    
    const trimmedValue = value.trim();
    if (trimmedValue.length < 2) {
      return Promise.reject("Full name must be at least 2 characters long");
    }
    
    if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) {
      return Promise.reject("Full name can only contain letters and spaces");
    }
    
    const words = trimmedValue.split(" ").filter(word => word.length > 0);
    if (words.length < 2) {
      return Promise.reject("Please enter both first and last name");
    }

    const isCapitalized = words.every((word) => {
      const firstLetter = word.charAt(0);
      return firstLetter === firstLetter.toUpperCase();
    });

    if (!isCapitalized) {
      return Promise.reject("The first letter of each word must be capitalized");
    }

    if (trimmedValue.length > 100) {
      return Promise.reject("Full name must not exceed 100 characters");
    }

    return Promise.resolve();
  };

  const isValidPhoneNumber = (rule, value) => {
    if (!value) {
      return Promise.reject("Phone number is required");
    }
    
    const phoneRegex = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(value)) {
      return Promise.reject("Please enter a valid Vietnamese phone number");
    }

    return Promise.resolve();
  };

  const isValidAddress = (rule, value) => {
    if (!value) {
      return Promise.reject("Street address is required");
    }
    
    const trimmedValue = value.trim();
    if (trimmedValue.length < 5) {
      return Promise.reject("Address must be at least 5 characters long");
    }
    
    if (trimmedValue.length > 200) {
      return Promise.reject("Address must not exceed 200 characters");
    }

    return Promise.resolve();
  };

  const handleProvinceChange = (provinceCode) => {
    console.log("Province changed:", provinceCode);
    
    const districts = Districts.filter(d => d.province_code === provinceCode);
    console.log("Found districts:", districts.length);
    
    setFilteredDistricts(districts);
    setFilteredWards([]);
    
    form.setFieldsValue({
      district: null,
      ward: null
    });
  };

  const handleDistrictChange = (districtCode) => {
    console.log("District changed:", districtCode);
    
    const wards = Wards.filter(w => w.district_code === districtCode);
    console.log("Found wards:", wards.length);
    
    setFilteredWards(wards);
    
    form.setFieldsValue({
      ward: null
    });
  };

  useEffect(() => {
    if (infoUser && infoUser.province) {
      console.log("Initializing with saved data:", infoUser);
      
      const provinceCode = infoUser.province;
      const districts = Districts.filter(d => d.province_code === provinceCode);
      setFilteredDistricts(districts);
      
      if (infoUser.district && districts.length > 0) {
        const districtCode = infoUser.district;
        const wards = Wards.filter(w => w.district_code === districtCode);
        setFilteredWards(wards);
      }
    }
  }, [infoUser]); 



  useEffect(() => {
    if (!hasShownNotification) {
      if (infoUser) {
        notification.success(
          "You already have personal information, do you want to change it?",
          3000
        );
      } else {
        notification.warning("Please enter personal information.", 3000);
      }
      setHasShownNotification(true);
    }
  }, [infoUser, notification, hasShownNotification]);

  const handleOnFinish = (values) => {
    console.log("Form submitted with values:", values);
    
    const selectedProductsJSON = localStorage.getItem("selectedProducts");
    const selectedProducts = selectedProductsJSON ? JSON.parse(selectedProductsJSON) : [];
    
    if (selectedProducts.length === 0) {
      notification.error("No products selected for purchase", 3000);
      return;
    }
    
    localStorage.setItem("infoOrder", JSON.stringify(values));
    
    let completedOrders = JSON.parse(localStorage.getItem("storedOrders")) || [];
    
    const newOrder = {
      id: Date.now(), 
      products: selectedProducts,
      customerInfo: values,
      orderDate: new Date().toISOString(),
      status: 'completed'
    };
    
    completedOrders.push(newOrder);
    localStorage.setItem("storedOrders", JSON.stringify(completedOrders));
    
    selectedProducts.forEach(product => {
      removeItem(product.id);
    });
    
    localStorage.removeItem("selectedProducts");
    
    notification.success("Order completed successfully!", 3000);

    setTimeout(() => {
      navigate("/checkout");
    }, 1500);
  };

  const {  removeItem } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Shopping Experience"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Secure & Fast Checkout
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your information is protected with enterprise-grade security. 
                    Complete your purchase with confidence.
                  </p>
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">SSL Secured</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-3">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Customer Information
                </h1>
                <p className="text-gray-600 text-sm">
                  Please fill in your details to complete your order
                </p>
              </div>

              <Form
                form={form}
                name="customer-info-form"
                onFinish={handleOnFinish}
                initialValues={infoUser}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  label={
                    <span className="flex items-center text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </span>
                  }
                  name="fullname"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                    { validator: isValidFullName },
                  ]}
                >
                  <Input 
                    placeholder="Enter your full name (e.g., John Doe)"
                    className="h-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    label={
                      <span className="flex items-center text-sm font-semibold text-gray-700">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address
                      </span>
                    }
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "Please enter a valid email address!",
                      },
                    ]}
                    className="mb-0"
                  >
                    <Input 
                      placeholder="your.email@example.com"
                      className="h-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="flex items-center text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Number
                      </span>
                    }
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter your phone number!" },
                      { validator: isValidPhoneNumber },
                    ]}
                    className="mb-0"
                  >
                    <Input 
                      placeholder="+84 xxx xxx xxx"
                      className="h-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Form.Item
                    label={
                      <span className="flex items-center text-sm font-semibold text-gray-700">
                        <Flag className="w-4 h-4 mr-2" />
                        Province/City
                      </span>
                    }
                    name="province"
                    rules={[{ required: true, message: "Please select your province!" }]}
                    className="mb-0"
                  >
                    <Select
                      placeholder="Select province"
                      className="h-10"
                      onChange={handleProvinceChange}
                      showSearch
                      optionFilterProp="children"
                      dropdownStyle={{ minWidth: '300px' }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      allowClear
                    >
                      {Provinces.map((province) => (
                        <Option key={province.code} value={province.code}>
                          {province.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="flex items-center text-sm font-semibold text-gray-700">
                        <Building className="w-4 h-4 mr-2" />
                        District
                      </span>
                    }
                    name="district"
                    rules={[{ required: true, message: "Please select your district!" }]}
                    className="mb-0"
                  >
                    <Select
                      placeholder="Select district"
                      className="h-10"
                      onChange={handleDistrictChange}
                      disabled={filteredDistricts.length === 0}
                      showSearch
                      optionFilterProp="children"
                      dropdownStyle={{ minWidth: '300px' }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      allowClear
                      notFoundContent={filteredDistricts.length === 0 ? "Please select a province first" : "No data"}
                    >
                      {filteredDistricts.map((district) => (
                        <Option key={district.code} value={district.code}>
                          {district.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="flex items-center text-sm font-semibold text-gray-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        Ward
                      </span>
                    }
                    name="ward"
                    rules={[{ required: true, message: "Please select your ward!" }]}
                    className="mb-0"
                  >
                    <Select
                      placeholder="Select ward"
                      className="h-10"
                      disabled={filteredWards.length === 0}
                      showSearch
                      optionFilterProp="children"
                      dropdownStyle={{ minWidth: '300px' }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      allowClear
                      notFoundContent={filteredWards.length === 0 ? "Please select a district first" : "No data"}
                    >
                      {filteredWards.map((ward) => (
                        <Option key={ward.code} value={ward.code}>
                          {ward.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  label={
                    <span className="flex items-center text-sm font-semibold text-gray-700">
                      <Home className="w-4 h-4 mr-2" />
                      Street Address
                    </span>
                  }
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                    { validator: isValidAddress }
                  ]}
                >
                  <Input 
                    placeholder="Enter your street address (house number, street name)"
                    className="h-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="flex items-center text-sm font-semibold text-gray-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Order Notes (Optional)
                    </span>
                  }
                  name="notes"
                >
                  <TextArea 
                    placeholder="Any special instructions for your order..."
                    rows={2}
                    className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    style={{ resize: 'none' }}
                  />
                </Form.Item>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="default"
                    onClick={() => navigate('/cart')}
                    className="flex-1 h-12 rounded-xl border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 text-base font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-none text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Purchase
                  </Button>
                </div>
              </Form>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;