import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Scale, 
  ShoppingCart, 
  CreditCard, 
  Truck,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import './index.scss';

const TermsOfService = (props) => {
  props.myFun(false);
  props.myFun2(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      <div className="terms-header">
        <div className="terms-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="terms-hero">
            <div className="terms-icon">
              <FileText size={48} />
            </div>
            <h1>Terms of Service</h1>
            <p className="terms-subtitle">
              Please read these terms carefully before using our services
            </p>
            <div className="last-updated">
              <Calendar size={16} />
              Effective Date: December 2024
            </div>
          </div>
        </div>
      </div>

      <div className="terms-content">
        <div className="terms-container-inner">
          
          <div className="terms-summary">
            <h2>
              <AlertCircle size={24} />
              Key Points
            </h2>
            <div className="summary-grid">
              <div className="summary-item accepted">
                <CheckCircle size={20} />
                <div>
                  <h3>What You Can Do</h3>
                  <p>Browse, purchase, and enjoy our products</p>
                </div>
              </div>
              <div className="summary-item restricted">
                <XCircle size={20} />
                <div>
                  <h3>What's Not Allowed</h3>
                  <p>Misuse of our platform or fraudulent activities</p>
                </div>
              </div>
              <div className="summary-item info">
                <Scale size={20} />
                <div>
                  <h3>Your Responsibilities</h3>
                  <p>Provide accurate information and follow our policies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="terms-sections">
            
            <section className="terms-section">
              <h2>
                <Scale size={24} />
                Acceptance of Terms
              </h2>
              <div className="section-content">
                <p>By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                
                <div className="highlight-box">
                  <AlertCircle size={20} />
                  <p><strong>Important:</strong> These terms may be updated from time to time. Continued use of our service constitutes acceptance of any changes.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>
                <ShoppingCart size={24} />
                Product Information & Orders
              </h2>
              <div className="section-content">
                <div className="subsection">
                  <h3>Product Descriptions</h3>
                  <ul>
                    <li>We strive to provide accurate product information</li>
                    <li>Colors and images may vary slightly from actual products</li>
                    <li>Product availability is subject to change without notice</li>
                    <li>We reserve the right to limit quantities purchased</li>
                  </ul>
                </div>

                <div className="subsection">
                  <h3>Order Processing</h3>
                  <ul>
                    <li>All orders are subject to acceptance and availability</li>
                    <li>We may refuse or cancel orders at our discretion</li>
                    <li>Order confirmation does not guarantee product availability</li>
                    <li>Prices are subject to change without notice</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>
                <CreditCard size={24} />
                Payment Terms
              </h2>
              <div className="section-content">
                <div className="payment-grid">
                  <div className="payment-item">
                    <h4>Accepted Methods</h4>
                    <p>Credit cards, debit cards, PayPal, and other approved payment methods</p>
                  </div>
                  <div className="payment-item">
                    <h4>Payment Security</h4>
                    <p>All payments are processed through secure, encrypted connections</p>
                  </div>
                  <div className="payment-item">
                    <h4>Billing</h4>
                    <p>Payment is due at time of order placement</p>
                  </div>
                  <div className="payment-item">
                    <h4>Refunds</h4>
                    <p>Refunds processed according to our return policy</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>
                <Truck size={24} />
                Shipping & Returns
              </h2>
              <div className="section-content">
                <div className="shipping-returns">
                  <div className="policy-block">
                    <h3>Shipping Policy</h3>
                    <ul>
                      <li>Standard shipping: 5-7 business days</li>
                      <li>Express shipping: 2-3 business days</li>
                      <li>Free shipping on orders over $50</li>
                      <li>International shipping available</li>
                    </ul>
                  </div>

                  <div className="policy-block">
                    <h3>Return Policy</h3>
                    <ul>
                      <li>30-day return window from delivery date</li>
                      <li>Items must be unused and in original packaging</li>
                      <li>Return shipping costs may apply</li>
                      <li>Refunds processed within 5-10 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>
                <AlertCircle size={24} />
                User Responsibilities
              </h2>
              <div className="section-content">
                <div className="responsibilities-grid">
                  <div className="responsibility-item do">
                    <CheckCircle size={18} />
                    <div>
                      <h4>You Must</h4>
                      <ul>
                        <li>Provide accurate account information</li>
                        <li>Keep your password secure</li>
                        <li>Use the service lawfully</li>
                        <li>Respect intellectual property rights</li>
                      </ul>
                    </div>
                  </div>

                  <div className="responsibility-item dont">
                    <XCircle size={18} />
                    <div>
                      <h4>You Must Not</h4>
                      <ul>
                        <li>Share your account with others</li>
                        <li>Use the service for illegal purposes</li>
                        <li>Attempt to hack or disrupt our systems</li>
                        <li>Post harmful or offensive content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>
                <Scale size={24} />
                Limitation of Liability
              </h2>
              <div className="section-content">
                <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
                
                <div className="liability-notice">
                  <h4>Our liability is limited to:</h4>
                  <ul>
                    <li>The amount you paid for the specific product or service</li>
                    <li>Replacement or repair of defective products</li>
                    <li>Refund according to our return policy</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          <div className="terms-contact">
            <h2>Questions About These Terms?</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>legal@ecommerceshop.com</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;