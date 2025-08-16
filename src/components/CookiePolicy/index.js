import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cookie, 
  Settings, 
  BarChart3, 
  Target, 
  Shield,
  ArrowLeft,
  Info,
  AlertTriangle,
  Calendar,
  Mail,
  Phone,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import './index.scss';

const CookiePolicy = (props) => {
  props.myFun(false);
  props.myFun2(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cookie-policy-container">
      <div className="cookie-header">
        <div className="cookie-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="cookie-hero">
            <div className="cookie-icon">
              <Cookie size={48} />
            </div>
            <h1>Cookie Policy</h1>
            <p className="cookie-subtitle">
              Learn how we use cookies to improve your browsing experience
            </p>
            <div className="last-updated">
              <Calendar size={16} />
              Last updated: December 2024
            </div>
          </div>
        </div>
      </div>

      <div className="cookie-content">
        <div className="cookie-container">
          
          <div className="cookie-intro">
            <h2>
              <Info size={24} />
              What are Cookies?
            </h2>
            <div className="intro-content">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better browsing experience by remembering your preferences 
                and analyzing how you use our site.
              </p>
              
              <div className="cookie-visual">
                <div className="cookie-flow">
                  <div className="flow-step">
                    <div className="step-icon">1</div>
                    <p>You visit our website</p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-icon">2</div>
                    <p>Cookies are stored</p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-icon">3</div>
                    <p>Better experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cookie-types">
            <h2>Types of Cookies We Use</h2>
            
            <div className="cookie-categories">
              
              <div className="cookie-category essential">
                <div className="category-header">
                  <Shield size={24} />
                  <div>
                    <h3>Essential Cookies</h3>
                    <span className="status required">Required</span>
                  </div>
                  <div className="toggle-container">
                    <ToggleRight size={24} className="toggle-on" />
                  </div>
                </div>
                <div className="category-content">
                  <p>These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.</p>
                  <div className="cookie-examples">
                    <h4>Examples:</h4>
                    <ul>
                      <li>Session management</li>
                      <li>Security features</li>
                      <li>Shopping cart functionality</li>
                      <li>User authentication</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cookie-category analytics">
                <div className="category-header">
                  <BarChart3 size={24} />
                  <div>
                    <h3>Analytics Cookies</h3>
                    <span className="status optional">Optional</span>
                  </div>
                  <div className="toggle-container">
                    <ToggleRight size={24} className="toggle-on" />
                  </div>
                </div>
                <div className="category-content">
                  <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  <div className="cookie-examples">
                    <h4>Examples:</h4>
                    <ul>
                      <li>Google Analytics</li>
                      <li>Page view tracking</li>
                      <li>User behavior analysis</li>
                      <li>Performance monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cookie-category functional">
                <div className="category-header">
                  <Settings size={24} />
                  <div>
                    <h3>Functional Cookies</h3>
                    <span className="status optional">Optional</span>
                  </div>
                  <div className="toggle-container">
                    <ToggleRight size={24} className="toggle-on" />
                  </div>
                </div>
                <div className="category-content">
                  <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
                  <div className="cookie-examples">
                    <h4>Examples:</h4>
                    <ul>
                      <li>Language preferences</li>
                      <li>Theme settings</li>
                      <li>Recently viewed products</li>
                      <li>Wishlist items</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cookie-category marketing">
                <div className="category-header">
                  <Target size={24} />
                  <div>
                    <h3>Marketing Cookies</h3>
                    <span className="status optional">Optional</span>
                  </div>
                  <div className="toggle-container">
                    <ToggleLeft size={24} className="toggle-off" />
                  </div>
                </div>
                <div className="category-content">
                  <p>These cookies are used to deliver personalized advertisements and track the effectiveness of marketing campaigns.</p>
                  <div className="cookie-examples">
                    <h4>Examples:</h4>
                    <ul>
                      <li>Targeted advertising</li>
                      <li>Social media integration</li>
                      <li>Campaign tracking</li>
                      <li>Retargeting pixels</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="cookie-management">
            <h2>
              <Settings size={24} />
              Managing Your Cookie Preferences
            </h2>
            <div className="management-content">
              <div className="management-options">
                
                <div className="management-option">
                  <div className="option-icon">
                    <Settings size={24} />
                  </div>
                  <div className="option-content">
                    <h3>Cookie Settings</h3>
                    <p>Use our cookie preference center to enable or disable specific cookie categories.</p>
                    <button className="settings-btn">
                      Manage Preferences
                    </button>
                  </div>
                </div>

                <div className="management-option">
                  <div className="option-icon">
                    <Shield size={24} />
                  </div>
                  <div className="option-content">
                    <h3>Browser Settings</h3>
                    <p>Configure your browser to block or delete cookies. Note that this may affect website functionality.</p>
                    <div className="browser-links">
                      <a href="https://www.google.com/chrome/" className="browser-link">Chrome</a>
                      <a href="https://www.mozilla.org/firefox/" className="browser-link">Firefox</a>
                      <a href="https://www.apple.com/safari/" className="browser-link">Safari</a>
                      <a href="https://www.microsoft.com/edge" className="browser-link">Edge</a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="important-notice">
                <AlertTriangle size={20} />
                <div>
                  <h4>Important Note</h4>
                  <p>Disabling certain cookies may impact your browsing experience and limit some website features. Essential cookies cannot be disabled as they are necessary for the website to function properly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="third-party-section">
            <h2>Third-Party Services</h2>
            <p>We use various third-party services that may set their own cookies:</p>
            
            <div className="third-party-grid">
              <div className="third-party-item">
                <h4>Google Analytics</h4>
                <p>Web analytics service</p>
                <span className="privacy-link">Privacy Policy</span>
              </div>
              <div className="third-party-item">
                <h4>Payment Processors</h4>
                <p>Secure payment handling</p>
                <span className="privacy-link">Privacy Policy</span>
              </div>
              <div className="third-party-item">
                <h4>Social Media</h4>
                <p>Social sharing features</p>
                <span className="privacy-link">Privacy Policy</span>
              </div>
              <div className="third-party-item">
                <h4>Customer Support</h4>
                <p>Live chat and help desk</p>
                <span className="privacy-link">Privacy Policy</span>
              </div>
            </div>
          </div>

          <div className="cookie-contact">
            <h2>Questions About Cookies?</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>cookies@ecommerceshop.com</span>
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

export default CookiePolicy;