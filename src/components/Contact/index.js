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
  AlertCircle,
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

  useEffect(() => {
    emailjs.init("9v1RiOXzBjvQ_2cDp");
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      notification.error(
        "Please fill in all required fields with valid information.",
        3000
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        message: formData.message,
        to_name: "Support Team",
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
    const phoneRegex = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

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
      
      <div className="hero-section bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-12 mb-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Get In Touch</h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Vietnam Location</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="contact-content-grid grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="contact-form-container bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Send Message
              </h2>
              <p className="text-gray-600 text-sm">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <form ref={form} onSubmit={sendEmail} className="contact-form space-y-4 flex-1">
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className={`h-4 w-4 ${
                        formErrors.user_name ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Enter your full name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm ${
                      formErrors.user_name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.user_name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Please enter your full name.
                  </p>
                )}
              </div>

              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      className={`h-4 w-4 ${
                        formErrors.user_email ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="your.email@example.com"
                    value={formData.user_email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm ${
                      formErrors.user_email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.user_email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone
                      className={`h-4 w-4 ${
                        formErrors.user_phone ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="+84 xxx xxx xxx"
                    value={formData.user_phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm ${
                      formErrors.user_phone
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.user_phone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Please enter a valid Vietnamese phone number.
                  </p>
                )}
              </div>

              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MessageSquare
                      className={`h-4 w-4 ${
                        formErrors.message ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Enter your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-sm ${
                      formErrors.message
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Please enter your message.
                  </p>
                )}
              </div>

              
              <button
                type="submit"
                disabled={
                  Object.values(formErrors).some(Boolean) || isSubmitting
                }
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          
          <div className="map-container-wrapper bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="map-header p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <h3 className="text-xl font-bold mb-1">Visit Our Store</h3>
              <p className="opacity-90 text-sm">
                Find us at our location in Ho Chi Minh City
              </p>
            </div>
            <div className="map-iframe-container">
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
            <div className="map-info p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="info-item flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="info-title font-medium text-gray-800 text-sm">Address</p>
                    <p className="info-text text-xs text-gray-600">
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
                <div className="info-item flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="info-title font-medium text-gray-800 text-sm">Hours</p>
                    <p className="info-text text-xs text-gray-600">24/7 Online Support</p>
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