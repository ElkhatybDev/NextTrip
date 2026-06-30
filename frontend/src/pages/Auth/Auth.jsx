import React, { useState } from "react";
import { Compass, MessageCircleMore, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login, signup, socialAuth } from "../../services/authApi";
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

function getRoleHomePath(role) {
  if (role === "agency") {
    return "/agency-dashboard";
  }

  if (role === "admin") {
    return "/nexttrip-dashboard";
  }

  return "/traveler-dashboard";
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialModal, setSocialModal] = useState(null);
  const [socialData, setSocialData] = useState({
    name: "",
    email: "",
    agencyName: "",
    phone: "",
  });

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

  const getApiFieldErrors = (error) => {
    const apiErrors = error?.data?.errors || {};

    return Object.entries(apiErrors).reduce((mappedErrors, [field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : messages;
      const key = field === "email" ? "loginEmail" : field === "password" ? "loginPassword" : field;

      return {
        ...mappedErrors,
        [key]: message,
      };
    }, {});
  };

  const handleLoginSubmit = async (e) => {
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

    setIsSubmitting(true);

    try {
      const session = await login(loginData);
      saveAuthSession(session);
      setMessage(`Login success for ${session.user.email}`);
      setErrors({});
      navigate(location.state?.from || getRoleHomePath(session.user.role), {
        replace: true,
      });
    } catch (error) {
      setMessage("");
      setErrors({
        loginEmail: error?.data?.message || "Login failed. Check your credentials.",
        ...getApiFieldErrors(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
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
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!signupData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const session = await signup({
          name: signupData.fullName,
          email: signupData.email,
          phone: signupData.phone || undefined,
          password: signupData.password,
          role,
          agency_name: signupData.agencyName || undefined,
          business_email: signupData.businessEmail || undefined,
          license_number: signupData.licenseNumber || undefined,
        });

        saveAuthSession(session);
        setMessage(`Account created for ${session.user.name} as ${session.user.role}`);
        setErrors({});
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
        navigate(getRoleHomePath(session.user.role), { replace: true });
      } catch (error) {
        const apiErrors = error?.data?.errors || {};

        setMessage("");
        setErrors({
          email: apiErrors.email?.[0] || error?.data?.message || "Signup failed.",
          fullName: apiErrors.name?.[0],
          phone: apiErrors.phone?.[0],
          agencyName: apiErrors.agency_name?.[0],
          businessEmail: apiErrors.business_email?.[0],
          password: apiErrors.password?.[0],
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage("");
    }
  };

  const handleSocialLogin = (provider) => {
    setMessage("");
    setErrors({});
    setSocialData({
      name: signupData.fullName || "",
      email: signupData.email || loginData.email || "",
      agencyName: signupData.agencyName || "",
      phone: signupData.phone || "",
    });
    setSocialModal(provider);
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    setSocialData((current) => ({ ...current, [name]: value }));
  };

  const closeSocialModal = () => {
    if (!isSubmitting) {
      setSocialModal(null);
    }
  };

  const submitSocialAuth = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!socialData.name.trim()) {
      nextErrors.socialName = "Name is required";
    }
    if (!socialData.email.trim()) {
      nextErrors.socialEmail = "Email is required";
    }
    if (role === "agency" && !socialData.agencyName.trim()) {
      nextErrors.socialAgencyName = "Agency name is required";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await socialAuth({
        provider: socialModal,
        name: socialData.name,
        email: socialData.email,
        role,
        agency_name: socialData.agencyName || undefined,
        business_email: socialData.email,
        phone: socialData.phone || undefined,
      });

      saveAuthSession(session);
      setSocialModal(null);
      setErrors({});
      navigate(getRoleHomePath(session.user.role), { replace: true });
    } catch (error) {
      const apiErrors = error?.data?.errors || {};

      setErrors({
        socialEmail: apiErrors.email?.[0] || error?.data?.message || "Social signup failed.",
        socialName: apiErrors.name?.[0],
        socialAgencyName: apiErrors.agency_name?.[0],
        phone: apiErrors.phone?.[0],
      });
    } finally {
      setIsSubmitting(false);
    }
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
              isSubmitting={isSubmitting}
            />
          </div>
        </section>
      </main>
      <Footer />

      {socialModal ? (
        <div className="social-auth-backdrop" role="presentation" onMouseDown={closeSocialModal}>
          <form
            className="social-auth-modal"
            onSubmit={submitSocialAuth}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div>
              <span>Continuer avec {socialModal === "google" ? "Google" : "Facebook"}</span>
              <h2>{activeTab === "signup" ? "Créer votre compte" : "Connexion rapide"}</h2>
              <p>
                Saisissez les informations du compte {role === "agency" ? "agence" : "voyageur"} à associer.
              </p>
            </div>

            <label>
              Nom complet
              <input name="name" value={socialData.name} onChange={handleSocialChange} />
              {errors.socialName ? <small>{errors.socialName}</small> : null}
            </label>

            <label>
              E-mail
              <input type="email" name="email" value={socialData.email} onChange={handleSocialChange} />
              {errors.socialEmail ? <small>{errors.socialEmail}</small> : null}
            </label>

            {role === "agency" ? (
              <>
                <label>
                  Nom de l’agence
                  <input name="agencyName" value={socialData.agencyName} onChange={handleSocialChange} />
                  {errors.socialAgencyName ? <small>{errors.socialAgencyName}</small> : null}
                </label>
                <label>
                  Téléphone
                  <input name="phone" value={socialData.phone} onChange={handleSocialChange} />
                </label>
              </>
            ) : null}

            <div className="social-auth-actions">
              <button type="button" onClick={closeSocialModal} disabled={isSubmitting}>
                Annuler
              </button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Connexion..." : "Continuer"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
