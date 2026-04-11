import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/images/NextTrip logo.png";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();

  const goToSection = (id) => {
    navigate("/", { state: { scrollTo: id } });
  };

  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("agency");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage(`Login success for ${loginData.email}`);
    setErrors({});
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!signupData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!signupData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!signupData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMessage(`Account created for ${signupData.fullName} as ${role}`);
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setMessage("");
    }
  };

  const handleSocialLogin = (provider) => {
    if (provider === "google") {
      alert("Google login simulation");
    } else {
      alert("Facebook login simulation");
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="auth-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="NextTrip" />
        </div>

        <nav className="auth-nav">
          <button type="button" onClick={() => goToSection("home")} className="active">
            Explore
          </button>
          <button type="button" onClick={() => goToSection("packages")}>
            Deals
          </button>
          <button type="button" onClick={() => goToSection("why")}>
            Agency
          </button>
          <button type="button" onClick={() => goToSection("about")}>
            About Us
          </button>
          <button type="button" onClick={() => goToSection("footer")}>
            Support
          </button>
        </nav>

        <div className="auth-header-right">
          <button className="sign-in-btn" onClick={() => navigate("/auth")}>
            Sign In
          </button>
          <div className="profile-icon">👤</div>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-left">
          <div>
            <h1>NextTrip</h1>
            <p>Every journey tells a story.</p>
          </div>

          <div className="discover-box">
            <div className="star-icon">✦</div>
            <h2>The World is Yours to Discover</h2>
            <p>
              Join a community of elite travelers and world-class agencies.
              Experience travel as it was meant to be: curated, seamless, and unforgettable.
            </p>

            <div className="avatars-row">
              <div className="avatars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <small>12k+ active explorers this week</small>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-box">
            <h2>{activeTab === "login" ? "Welcome Back" : "Create Account"}</h2>
            <p className="subtext">
              {activeTab === "login"
                ? "Sign in to your account or create a new one to continue your journey."
                : "Join NextTrip and start building your next travel experience."}
            </p>

            <div className="tabs">
              <button
                className={activeTab === "login" ? "tab active-tab" : "tab"}
                onClick={() => {
                  setActiveTab("login");
                  setMessage("");
                  setErrors({});
                }}
                type="button"
              >
                Login
              </button>

              <button
                className={activeTab === "signup" ? "tab active-tab" : "tab"}
                onClick={() => {
                  setActiveTab("signup");
                  setMessage("");
                  setErrors({});
                }}
                type="button"
              >
                Sign-up
              </button>
            </div>

            {activeTab === "login" ? (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <div className="input-box">
                  <span>✉</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="forgot-row">
                  <button type="button">Forgot?</button>
                </div>

                <div className="input-box">
                  <span>🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>

                <button type="submit" className="main-btn">
                  Continue Adventure →
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
                      onClick={() => setRole("traveler")}
                    >
                      <span>🧍</span>
                      <strong>TRAVELER</strong>
                    </button>

                    <button
                      type="button"
                      className={role === "agency" ? "role-card selected" : "role-card"}
                      onClick={() => setRole("agency")}
                    >
                      <span>🧭</span>
                      <strong>TRAVEL AGENCY</strong>
                    </button>
                  </div>
                </div>

                <form className="auth-form" onSubmit={handleSignupSubmit}>
                  <div>
                    <div className="input-box">
                      <span>👤</span>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={signupData.fullName}
                        onChange={handleSignupChange}
                      />
                    </div>
                    {errors.fullName && <small className="error">{errors.fullName}</small>}
                  </div>

                  <div>
                    <div className="input-box">
                      <span>✉</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                      />
                    </div>
                    {errors.email && <small className="error">{errors.email}</small>}
                  </div>

                  <div>
                    <div className="input-box">
                      <span>🔒</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                    {errors.password && <small className="error">{errors.password}</small>}
                  </div>

                  <div>
                    <div className="input-box">
                      <span>🔐</span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <small className="error">{errors.confirmPassword}</small>
                    )}
                  </div>

                  <button type="submit" className="main-btn">
                    Create Account →
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
              <button type="button" onClick={() => handleSocialLogin("google")}>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="Google"
                />
                Google
              </button>

              <button type="button" onClick={() => handleSocialLogin("facebook")}>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  alt="Facebook"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}