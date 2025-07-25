import emailjs from "@emailjs/browser";
import "../Contact/index.scss";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../Notification";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

export const Contact = (props) => {
  props.myFun(false);
  props.myFun2(true);

  const notification = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("9v1RiOXzBjvQ_2cDp");
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      notification.error(
        "Please fill in all information and enter the correct email format.",
        3000
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for emailjs
      const templateParams = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        message: formData.message,
        to_name: "Support Team", // Optional
      };

      const result = await emailjs.send(
        "service_qpichki",
        "template_32uk31l",
        templateParams,
        "K_wODtXx705gz49oa"
      );

      console.log("Email sent successfully:", result);

      notification.success(
        "Message sent successfully! We'll get back to you soon.",
        3000
      );

      // Reset form
      setFormData({
        user_name: "",
        user_email: "",
        user_phone: "",
        message: "",
      });

      setFormErrors({
        user_name: false,
        user_email: false,
        user_phone: false,
        message: false,
      });

      // Navigate after delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      notification.error(
        "Failed to send message. Please try again later.",
        3000
      );
    } finally {
      setIsSubmitting(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    if (name === "user_email") {
      setFormErrors({
        ...formErrors,
        [name]: !isValidEmail(value),
      });
    } else if (name === "user_phone") {
      setFormErrors({
        ...formErrors,
        [name]: !isValidPhoneNumber(value),
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: !value.trim(),
      });
    }
  };

  const googleMapsURL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220235.78631011717!2d106.52803673028657!3d10.828039308819054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a3f1b2e8bfb%3A0xb3c9b77dcc25ebc7!2zU2nDqnUgdGjhu4sgVGjhur8gR2nhu5tpIERpIMSQ4buZbmc!5e0!3m2!1svi!2s!4v1691831495590!5m2!1svi!2s";

  return (
    <div className="contact-page-container min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Vietnam Location</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Send Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className={`h-5 w-5 ${
                        formErrors.user_name ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Nhập tên đầy đủ..."
                    value={formData.user_name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      formErrors.user_name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.user_name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    Vui lòng nhập họ và tên.
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      className={`h-5 w-5 ${
                        formErrors.user_email ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Nhập email..."
                    value={formData.user_email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      formErrors.user_email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.user_email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    Vui lòng nhập định dạng email hợp lệ.
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone
                      className={`h-5 w-5 ${
                        formErrors.user_phone ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="Nhập số điện thoại..."
                    value={formData.user_phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      formErrors.user_phone
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.user_phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    Vui lòng nhập số điện thoại hợp lệ.
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MessageSquare
                      className={`h-5 w-5 ${
                        formErrors.message ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Nhập nội dung tin nhắn..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none ${
                      formErrors.message
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.message && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    Vui lòng nhập nội dung.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  Object.values(formErrors).some(Boolean) || isSubmitting
                }
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <h3 className="text-2xl font-bold mb-2">Visit Our Store</h3>
              <p className="opacity-90">
                Find us at our location in Ho Chi Minh City
              </p>
            </div>
            <div className="h-96">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={googleMapsURL}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">Address</p>
                    <p className="text-sm text-gray-600">
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-800">Hours</p>
                    <p className="text-sm text-gray-600">24/7 Online Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
