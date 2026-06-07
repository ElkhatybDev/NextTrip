import React, { useState } from "react";
import { Compass, MessageCircleMore, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AuthForm from "../../components/AuthForm/AuthForm";
import { saveAuthSession } from "../../utils/authSession";
import "./Auth.css";

const featureHighlights = [
  {
    icon: Compass,
    title: "Personalized planning",
    text: "Build routes, budgets, and travel moods around the way you actually move.",
  },
  {
    icon: MessageCircleMore,
    title: "Direct agency contact",
    text: "Talk with agencies faster and refine your package in one clear flow.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable booking flow",
    text: "Cleaner choices, better visibility, and support that stays close to your trip.",
  },
];

const trustStats = [
  { value: "12k+", label: "active explorers" },
  { value: "120+", label: "trusted agencies" },
  { value: "24/7", label: "support coverage" },
];

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "login");
  const [role, setRole] = useState(location.state?.role || "traveler");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    agencyName: "",
    businessEmail: "",
    phone: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const clearFeedback = () => {
    setMessage("");
    setErrors({});
  };

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
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.loginEmail = "Email is required";
    }
    if (!loginData.password.trim()) {
      newErrors.loginPassword = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }

    saveAuthSession({ email: loginData.email, role });
    setMessage(`Login success for ${loginData.email}`);
    setErrors({});
    navigate(location.state?.from || (role === "agency" ? "/dashboard" : "/profile"), {
      replace: true,
    });
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
    if (role === "agency") {
      if (!signupData.agencyName.trim()) {
        newErrors.agencyName = "Agency name is required";
      }
      if (!signupData.businessEmail.trim()) {
        newErrors.businessEmail = "Business email is required";
      }
      if (!signupData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }
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
      saveAuthSession({ email: signupData.email, role });
      setMessage(`Account created for ${signupData.fullName} as ${role}`);
      setSignupData({
        fullName: "",
        email: "",
        agencyName: "",
        businessEmail: "",
        phone: "",
        licenseNumber: "",
        password: "",
        confirmPassword: "",
      });
      navigate(role === "agency" ? "/dashboard" : "/profile", { replace: true });
    } else {
      setMessage("");
    }
  };

  const handleSocialLogin = (provider) => {
    saveAuthSession({ email: `${provider}@nexttrip.local`, role });
    navigate(location.state?.from || (role === "agency" ? "/dashboard" : "/profile"), {
      replace: true,
    });
  };

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-shell">
        <section className="auth-container">
          <div className="auth-left">
            <div className="auth-left-copy">
              <div className="auth-heading-block">
                <h1>Step back into your next journey.</h1>
                <p className="auth-lead">
                  Sign in to manage bookings, compare offers, and keep every travel
                  conversation in one smoother experience.
                </p>
              </div>

              <div className="auth-feature-list">
                {featureHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article key={item.title} className="auth-feature-card">
                      <div className="auth-feature-icon">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="auth-bottom-panel">
              <div className="auth-mini-card">
                <p className="auth-mini-label">Trusted by travelers and agencies</p>
                <div className="auth-stats-grid">
                  {trustStats.map((item) => (
                    <div key={item.label} className="auth-stat">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="auth-right">
            <AuthForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              role={role}
              setRole={setRole}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              loginData={loginData}
              signupData={signupData}
              errors={errors}
              message={message}
              onLoginChange={handleLoginChange}
              onSignupChange={handleSignupChange}
              onLoginSubmit={handleLoginSubmit}
              onSignupSubmit={handleSignupSubmit}
              onSocialLogin={handleSocialLogin}
              clearFeedback={clearFeedback}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
