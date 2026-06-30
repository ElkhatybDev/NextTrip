import React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  UserRoundPlus,
} from "lucide-react";
import "./AuthForm.css";

export default function AuthForm({
  activeTab,
  setActiveTab,
  role,
  setRole,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loginData,
  signupData,
  errors,
  message,
  onLoginChange,
  onSignupChange,
  onLoginSubmit,
  onSignupSubmit,
  onSocialLogin,
  clearFeedback,
  isSubmitting = false,
}) {
  const isLogin = activeTab === "login";
  const isAgencySignup = role === "agency";

  return (
    <div className="auth-box">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>
      <p className="subtext">
        {isLogin
          ? "Access your dashboard, bookings, and saved travel plans in one place."
          : "Open your NextTrip account and start planning with better control."}
      </p>

      <div className="tabs">
        <button
          className={activeTab === "login" ? "tab active-tab" : "tab"}
          onClick={() => {
            setActiveTab("login");
            clearFeedback();
          }}
          type="button"
        >
          Login
        </button>

        <button
          className={activeTab === "signup" ? "tab active-tab" : "tab"}
          onClick={() => {
            setActiveTab("signup");
            clearFeedback();
          }}
          type="button"
        >
          Create Account
        </button>
      </div>

      {isLogin ? (
        <form className="auth-form" onSubmit={onLoginSubmit}>
          <div className="input-box">
            <Mail size={18} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={onLoginChange}
            />
          </div>
          {errors.loginEmail && <small className="error">{errors.loginEmail}</small>}

          <div className="input-box">
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={onLoginChange}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.loginPassword && <small className="error">{errors.loginPassword}</small>}

          <div className="remember-row">
            <label className="remember-check">
              <input type="checkbox" />
              <span>Keep me signed in</span>
            </label>

            <button type="button" className="text-link">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="main-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"} <ArrowRight size={18} />
          </button>
        </form>
      ) : (
        <>
          <div className="join-role">
            <p>I am joining as:</p>

            <div className="role-boxes">
              <button
                type="button"
                className={role === "traveler" ? "role-card selected" : "role-card"}
                onClick={() => {
                  setRole("traveler");
                  clearFeedback();
                }}
              >
                <span aria-hidden="true">
                  <UserRoundPlus size={28} />
                </span>
                <strong>Traveler</strong>
                <small>Book trips and manage your travel plans.</small>
              </button>

              <button
                type="button"
                className={role === "agency" ? "role-card selected" : "role-card"}
                onClick={() => {
                  setRole("agency");
                  clearFeedback();
                }}
              >
                <span aria-hidden="true">
                  <BriefcaseBusiness size={28} />
                </span>
                <strong>Agency</strong>
                <small>Create packages and manage client requests.</small>
              </button>
            </div>
          </div>

          <form className="auth-form" onSubmit={onSignupSubmit}>
            <div>
              <div className="input-box">
                <User size={18} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={signupData.fullName}
                  onChange={onSignupChange}
                />
              </div>
              {errors.fullName && <small className="error">{errors.fullName}</small>}
            </div>

            <div>
              <div className="input-box">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={onSignupChange}
                />
              </div>
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            {isAgencySignup ? (
              <div className="agency-fields">
                <div>
                  <div className="input-box">
                    <BriefcaseBusiness size={18} />
                    <input
                      type="text"
                      name="agencyName"
                      placeholder="Agency name"
                      value={signupData.agencyName}
                      onChange={onSignupChange}
                    />
                  </div>
                  {errors.agencyName && (
                    <small className="error">{errors.agencyName}</small>
                  )}
                </div>

                <div>
                  <div className="input-box">
                    <Mail size={18} />
                    <input
                      type="email"
                      name="businessEmail"
                      placeholder="Business email"
                      value={signupData.businessEmail}
                      onChange={onSignupChange}
                    />
                  </div>
                  {errors.businessEmail && (
                    <small className="error">{errors.businessEmail}</small>
                  )}
                </div>

                <div>
                  <div className="input-box">
                    <Phone size={18} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Agency phone number"
                      value={signupData.phone}
                      onChange={onSignupChange}
                    />
                  </div>
                  {errors.phone && <small className="error">{errors.phone}</small>}
                </div>

                <div className="input-box">
                  <BriefcaseBusiness size={18} />
                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder="Registration or license number (optional)"
                    value={signupData.licenseNumber}
                    onChange={onSignupChange}
                  />
                </div>
              </div>
            ) : null}

            <div>
              <div className="input-box">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={signupData.password}
                  onChange={onSignupChange}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <small className="error">{errors.password}</small>}
            </div>

            <div>
              <div className="input-box">
                <Lock size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={onSignupChange}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <small className="error">{errors.confirmPassword}</small>
              )}
            </div>

            <button type="submit" className="main-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create My Account"} <ArrowRight size={18} />
            </button>
          </form>
        </>
      )}

      {message && <div className="success-msg">{message}</div>}

      <div className="divider">
        <span></span>
        <p>OR CONTINUE WITH</p>
        <span></span>
      </div>

      <div className="social-buttons">
        <button type="button" onClick={() => onSocialLogin("google")}>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google"
            decoding="async"
          />
          Google
        </button>

        <button type="button" onClick={() => onSocialLogin("facebook")}>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
            alt="Facebook"
            decoding="async"
          />
          Facebook
        </button>
      </div>
    </div>
  );
}
