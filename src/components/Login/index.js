import React, { useState } from "react";
import { fetchApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Shield,
  Heart,
  Sparkles,
  CheckCircle
} from "lucide-react";
import "../Login/index.scss";
import { useNotification } from "../Notification";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const notification = useNotification();
  props.myFun(false);
  props.myFun2(false);

  const handleResponseLogin = (data) => {
    localStorage.setItem("accessToken", data?.token);
    localStorage.setItem("dataUser", JSON.stringify(data));
    data && notification.success("Login successfully!", 3000);
    setIsLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleError = (data) => {
    notification.error(data?.message || "Something went wrong!", 3000);
    setIsLoading(false);
  };

  const handleLogin = () => {
    if (!email || !password) {
      notification.error("Please fill in all fields!", 3000);
      return;
    }
    setIsLoading(true);
    fetchApi(
      "POST",
      "https://dummyjson.com/auth",
      "login",
      handleResponseLogin,
      handleError,
      { username: email, password: password }
    );
  };

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !fullName) {
      notification.error("Please fill in all fields!", 3000);
      return;
    }
    if (password !== confirmPassword) {
      notification.error("Passwords do not match!", 3000);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      notification.success("Account created successfully!", 3000);
      setIsLoading(false);
      setIsSignUp(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
    }, 2000);
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      notification.error("Please enter your email address!", 3000);
      return;
    }
    notification.success("Reset password link sent to your email!", 3000);
    setShowForgotPassword(false);
    setResetEmail("");
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setShowForgotPassword(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-elements">
        <div className="floating-element element-1">
          <Sparkles size={24} />
        </div>
        <div className="floating-element element-2">
          <Heart size={20} />
        </div>
        <div className="floating-element element-3">
          <Shield size={28} />
        </div>
      </div>

      <div className="auth-content">
<div className="auth-image-section">
  <div className="auth-image-overlay">
    <div className="auth-image-container">
      <img
        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt="Shopping Experience"
        className="auth-main-image"
      />
      <div className="auth-image-content">
        <h2 className="auth-image-title">
          Welcome to Our Store
        </h2>
        <p className="auth-image-subtitle">
          Discover amazing products and enjoy a seamless shopping experience
        </p>
        <div className="auth-features">
          <div className="auth-feature">
            <CheckCircle size={20} />
            <span>Secure Shopping</span>
          </div>
          <div className="auth-feature">
            <CheckCircle size={20} />
            <span>Fast Delivery</span>
          </div>
          <div className="auth-feature">
            <CheckCircle size={20} />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            {!showForgotPassword ? (
              <>
                <div className="auth-header">
                  <h1 className="auth-title">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </h1>
                  <p className="auth-subtitle">
                    {isSignUp 
                      ? "Join us and start your shopping journey" 
                      : "Sign in to your account to continue"
                    }
                  </p>
                </div>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                  {isSignUp && (
                    <div className="input-group">
                      <label className="input-label">Full Name</label>
                      <div className="input-wrapper">
                        <User className="input-icon" size={20} />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="auth-input"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-wrapper">
                      <Mail className="input-icon" size={20} />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="input-wrapper">
                      <Lock className="input-icon" size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="input-group">
                      <label className="input-label">Confirm Password</label>
                      <div className="input-wrapper">
                        <Lock className="input-icon" size={20} />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="auth-input"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {!isSignUp && (
                    <div className="auth-options">
                      <label className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="checkbox-label">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="forgot-password-link"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
                    onClick={isSignUp ? handleSignUp : handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        {isSignUp ? "Create Account" : "Sign In"}
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-toggle">
                  <p>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button
                      type="button"
                      className="auth-toggle-btn"
                      onClick={toggleForm}
                    >
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="auth-header">
                  <h1 className="auth-title">Forgot Password</h1>
                  <p className="auth-subtitle">
                    Enter your email address and we'll send you a reset link
                  </p>
                </div>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-wrapper">
                      <Mail className="input-icon" size={20} />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="auth-input"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="auth-submit-btn"
                    onClick={handleForgotPassword}
                  >
                    Send Reset Link
                    <ArrowRight size={20} />
                  </button>
                </form>

                <div className="auth-toggle">
                  <button
                    type="button"
                    className="auth-toggle-btn"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;