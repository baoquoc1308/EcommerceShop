import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Mail, 
  Phone,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar
} from 'lucide-react';
import './index.scss';

const PrivacyPolicy = (props) => {
  props.myFun(false);
  props.myFun2(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-container">
      <div className="privacy-header">
        <div className="privacy-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="privacy-hero">
            <div className="privacy-icon">
              <Shield size={48} />
            </div>
            <h1>Privacy Policy</h1>
            <p className="privacy-subtitle">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information.
            </p>
            <div className="last-updated">
              <Calendar size={16} />
              Last updated: December 2024
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-content">
        <div className="privacy-container">
          
          <div className="privacy-overview">
            <h2>
              <Info size={24} />
              Quick Overview
            </h2>
            <div className="overview-grid">
              <div className="overview-item">
                <Eye size={20} />
                <div>
                  <h3>What We Collect</h3>
                  <p>Personal information you provide and usage data</p>
                </div>
              </div>
              <div className="overview-item">
                <Lock size={20} />
                <div>
                  <h3>How We Protect</h3>
                  <p>Industry-standard encryption and security measures</p>
                </div>
              </div>
              <div className="overview-item">
                <Users size={20} />
                <div>
                  <h3>Sharing Policy</h3>
                  <p>We never sell your data to third parties</p>
                </div>
              </div>
            </div>
          </div>

          <div className="privacy-sections">
            
            <section className="privacy-section">
              <h2>
                <Database size={24} />
                Information We Collect
              </h2>
              <div className="section-content">
                <div className="info-category">
                  <h3>Personal Information</h3>
                  <ul>
                    <li>Name and contact information</li>
                    <li>Email address and phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely)</li>
                  </ul>
                </div>
                
                <div className="info-category">
                  <h3>Usage Data</h3>
                  <ul>
                    <li>Pages visited and time spent</li>
                    <li>Products viewed and purchased</li>
                    <li>Search queries and preferences</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>
                <Eye size={24} />
                How We Use Your Information
              </h2>
              <div className="section-content">
                <div className="usage-grid">
                  <div className="usage-item">
                    <CheckCircle size={16} />
                    <span>Process and fulfill your orders</span>
                  </div>
                  <div className="usage-item">
                    <CheckCircle size={16} />
                    <span>Provide customer support</span>
                  </div>
                  <div className="usage-item">
                    <CheckCircle size={16} />
                    <span>Send order updates and notifications</span>
                  </div>
                  <div className="usage-item">
                    <CheckCircle size={16} />
                    <span>Improve our products and services</span>
                  </div>
                  <div className="usage-item">
                    <CheckCircle size={16} />
                    <span>Personalize your shopping experience</span>
                  </div>
                  <div className="usage-item">
                    <CheckCircle size={16} />
                    <span>Prevent fraud and ensure security</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>
                <Lock size={24} />
                Data Security
              </h2>
              <div className="section-content">
                <p>We implement industry-standard security measures to protect your information:</p>
                <div className="security-features">
                  <div className="security-item">
                    <Shield size={20} />
                    <div>
                      <h4>SSL Encryption</h4>
                      <p>All data transmission is encrypted using SSL technology</p>
                    </div>
                  </div>
                  <div className="security-item">
                    <Lock size={20} />
                    <div>
                      <h4>Secure Storage</h4>
                      <p>Data is stored on secure servers with restricted access</p>
                    </div>
                  </div>
                  <div className="security-item">
                    <AlertTriangle size={20} />
                    <div>
                      <h4>Regular Audits</h4>
                      <p>We conduct regular security audits and updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>
                <Users size={24} />
                Your Rights
              </h2>
              <div className="section-content">
                <p>You have the following rights regarding your personal information:</p>
                <div className="rights-list">
                  <div className="right-item">
                    <h4>Access</h4>
                    <p>Request access to your personal data</p>
                  </div>
                  <div className="right-item">
                    <h4>Correction</h4>
                    <p>Request correction of inaccurate data</p>
                  </div>
                  <div className="right-item">
                    <h4>Deletion</h4>
                    <p>Request deletion of your personal data</p>
                  </div>
                  <div className="right-item">
                    <h4>Portability</h4>
                    <p>Request transfer of your data</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          <div className="privacy-contact">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>privacy@ecommerceshop.com</span>
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

export default PrivacyPolicy;