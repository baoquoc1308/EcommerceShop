import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Truck,
  Headphones,
  Shield,
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github,
  ArrowUp,
  Sparkles
} from "lucide-react";
import "../Footer/index.scss";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="modern-footer">
      <div className="footer-features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <Truck size={24} />
            </div>
            <div className="feature-content">
              <h3>Free Delivery</h3>
              <p>Free shipping on orders over $50</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={24} />
            </div>
            <div className="feature-content">
              <h3>Secure Payment</h3>
              <p>100% secure payment methods</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Headphones size={24} />
            </div>
            <div className="feature-content">
              <h3>24/7 Support</h3>
              <p>Customer support anytime</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Heart size={24} />
            </div>
            <div className="feature-content">
              <h3>Money Back</h3>
              <p>30-day return guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-logo">
              <ShoppingBag size={32} />
              <span>EcommerceShop</span>
            </div>
            <p className="brand-description">
              Discover amazing products and enjoy a seamless shopping experience 
              with our curated collection of quality items.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/special-deals">Special Deals</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-title">Shopping</h3>
            <ul className="footer-nav">
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/checkout">My Orders</Link></li>
              <li><Link to="/checkoutform">Checkout</Link></li>
              <li><Link to="/">New Arrivals</Link></li>
              <li><Link to="/special-deals">Best Sellers</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-title">Get in Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Commerce Street, 12 District</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>hello@ecommerceshop.com</span>
              </div>
            </div>

            <div className="newsletter-signup">
              <h4>Stay Updated</h4>
              <p>Subscribe to get special offers and updates</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 EcommerceShop. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
            <button className="scroll-to-top" onClick={scrollToTop}>
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-decoration">
        <div className="decoration-element element-1">
          <Sparkles size={16} />
        </div>
        <div className="decoration-element element-2">
          <Heart size={14} />
        </div>
        <div className="decoration-element element-3">
          <ShoppingBag size={18} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;