import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  Gift,
  Heart,
  Info,
  Menu,
  Percent,
  Phone,
  Route,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import "./Navbar.css";
import logo from "../../Assets/images/NextTrip logo.png";
import { primaryNavLinks } from "../../data/siteNavigation";
import {
  fallbackCurrencies,
  fallbackLanguages,
  fetchTravelPreferences,
} from "../../services/preferencesApi";

function NavItem({ item, pathname, onNavigate }) {
  const isActive =
    item.active ||
    item.children?.some((child) =>
      child.to === "/" ? pathname === "/" : pathname === child.to || pathname.startsWith(`${child.to}/`)
    ) ||
    (item.to
      ? item.to === "/"
        ? pathname === "/"
        : pathname === item.to || pathname.startsWith(`${item.to}/`)
      : false);

  if (item.children?.length) {
    return (
      <div className="site-nav-dropdown">
        <button
          type="button"
          className={`site-nav-item site-nav-button site-nav-dropdown-trigger ${
            isActive ? "site-nav-item-active" : ""
          }`}
        >
          {item.label}
          <ChevronDown size={15} />
        </button>

        <div className="site-nav-dropdown-menu">
          {item.children.map((child) => (
            <Link
              key={child.label}
              to={child.to}
              onClick={onNavigate}
              className="site-nav-dropdown-link"
            >
              <span>{child.label}</span>
              {child.description ? <small>{child.description}</small> : null}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (item.to) {
    return (
      <Link
        to={item.to}
        onClick={onNavigate}
        className={`site-nav-item ${isActive ? "site-nav-item-active" : ""}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        item.onClick?.();
        onNavigate();
      }}
      className={`site-nav-item site-nav-button ${
        isActive ? "site-nav-item-active" : ""
      }`}
    >
      {item.label}
    </button>
  );
}

const drawerSections = [
  {
    title: "Start",
    items: [
      { label: "Create Trip", to: "/create-trip", icon: Route },
      { label: "Packages", to: "/packages", icon: Gift },
      { label: "Offers", to: "/packages", icon: Percent },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Experiences", to: "/experience", icon: BookOpen },
      { label: "Destinations", to: "/destinations", icon: Compass },
      { label: "Agencies", to: "/agency", icon: UsersRound },
    ],
  },
  {
    title: "Travel Styles",
    items: [
      { label: "Individual", to: "/travel-styles/individual", icon: UserRound },
      { label: "Group", to: "/travel-styles/group", icon: UsersRound },
      { label: "Family", to: "/travel-styles/family", icon: Heart },
      { label: "Religion", to: "/travel-styles/religion", icon: ShieldCheck },
      { label: "Honeymoon", to: "/travel-styles/honeymoon", icon: Gift },
      { label: "Adventures", to: "/travel-styles/adventure", icon: Compass },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "About Us", to: "/about", icon: Info },
      { label: "Contact Us", to: "/contact", icon: Phone },
    ],
  },
  {
    title: "Policies",
    items: [
      { label: "Privacy Policy", to: "/privacy", icon: ShieldCheck },
      { label: "Terms of Service", to: "/terms", icon: FileText },
    ],
  },
];

function SideMenuDrawer({ isOpen, onClose, onSignIn }) {
  return (
    <>
      <button
        type="button"
        className={`site-drawer-backdrop ${isOpen ? "site-drawer-backdrop-open" : ""}`}
        aria-label="Close side menu"
        onClick={onClose}
      />

      <aside
        className={`site-side-drawer ${isOpen ? "site-side-drawer-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="site-drawer-topbar">
          <Link to="/" className="site-drawer-home-link" onClick={onClose}>
            <ArrowLeft size={18} />
            <span>Back home</span>
          </Link>
          <button type="button" className="site-drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="site-drawer-login-card">
          <strong>Plan smarter with NextTrip</strong>
          <p>Find packages, compare offers, or send a clear custom trip request.</p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onSignIn();
            }}
          >
            Sign in to continue
          </button>
        </div>

        <section className="site-drawer-preferences">
          <HeaderPreferences />
        </section>

        <div className="site-drawer-sections">
          {drawerSections.map((section) => (
            <section key={section.title} className="site-drawer-section">
              <h3>{section.title}</h3>
              <div className="site-drawer-links">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={`${section.title}-${item.label}`}
                      to={item.to}
                      className="site-drawer-link"
                      onClick={onClose}
                    >
                      <span className="site-drawer-link-icon">
                        <Icon size={22} />
                      </span>
                      <span>{item.label}</span>
                      <ChevronRight size={20} />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </aside>
    </>
  );
}

function FlagMark({ item, className = "site-pref-flag" }) {
  const [hasImageError, setHasImageError] = useState(false);
  const countryCode = item.countryCode?.toLowerCase();
  const fallbackLabel = item.short || item.code?.slice(0, 2).toUpperCase();

  return (
    <span className={className} aria-hidden="true">
      {countryCode && !hasImageError ? (
        <img
          src={`https://flagcdn.com/w40/${countryCode}.png`}
          srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
          alt=""
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        fallbackLabel
      )}
    </span>
  );
}

function PreferenceOption({ option, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`site-pref-choice ${isActive ? "site-pref-choice-active" : ""}`}
      onClick={() => onSelect(option.code)}
    >
      <FlagMark item={option} />
      <span className="site-pref-choice-copy">
        <strong>{option.label}</strong>
        <small>
          {option.short || option.code}
          {option.country ? ` | ${option.country}` : ""}
        </small>
      </span>
      {isActive ? <Check size={14} /> : null}
    </button>
  );
}

function DrawerPreferenceRow({ title, selectedItem, options, isOpen, onToggle, onSelect }) {
  return (
    <div className={`site-pref-row ${isOpen ? "site-pref-row-open" : ""}`}>
      <button
        type="button"
        className="site-pref-row-button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <FlagMark item={selectedItem} className="site-pref-row-icon" />
        <span>
          <strong>{title}</strong>
          <small>{selectedItem.label}</small>
        </span>
        <ChevronDown size={17} />
      </button>

      {isOpen ? (
        <div className="site-pref-choice-grid">
          {options.slice(0, 8).map((option) => (
            <PreferenceOption
              key={option.code}
              option={option}
              isActive={option.code === selectedItem.code}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HeaderPreferences() {
  const [currencies, setCurrencies] = useState(fallbackCurrencies);
  const [languages, setLanguages] = useState(fallbackLanguages);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("MAD");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("eng");
  const [openPicker, setOpenPicker] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchTravelPreferences(controller.signal)
      .then((preferences) => {
        setCurrencies(preferences.currencies.length ? preferences.currencies : fallbackCurrencies);
        setLanguages(preferences.languages.length ? preferences.languages : fallbackLanguages);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setCurrencies(fallbackCurrencies);
          setLanguages(fallbackLanguages);
        }
      });

    return () => controller.abort();
  }, []);

  const selectedCurrency =
    currencies.find((currency) => currency.code === selectedCurrencyCode) || currencies[0];
  const selectedLanguage =
    languages.find((language) => language.code === selectedLanguageCode) || languages[0];

  return (
    <div className="site-preferences">
      <DrawerPreferenceRow
        title="Language"
        options={languages}
        selectedItem={selectedLanguage}
        isOpen={openPicker === "language"}
        onToggle={() => setOpenPicker((current) => (current === "language" ? null : "language"))}
        onSelect={(code) => {
          setSelectedLanguageCode(code);
          setOpenPicker(null);
        }}
      />

      <DrawerPreferenceRow
        title="Currency"
        options={currencies}
        selectedItem={selectedCurrency}
        isOpen={openPicker === "currency"}
        onToggle={() => setOpenPicker((current) => (current === "currency" ? null : "currency"))}
        onSelect={(code) => {
          setSelectedCurrencyCode(code);
          setOpenPicker(null);
        }}
      />
    </div>
  );
}

export default function Navbar({
  navItems = primaryNavLinks,
  signInLabel = "Sign In",
  onSignIn,
  showProfile = false,
  profileImageSrc = "",
  profileAlt = "User profile",
  rightSlot = null,
  logoTo = "/",
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSignIn = onSignIn || (() => navigate("/auth"));
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeOnExternalRequest = () => setIsMenuOpen(false);

    document.addEventListener("nexttrip:close-side-menu", closeOnExternalRequest);

    return () => {
      document.removeEventListener("nexttrip:close-side-menu", closeOnExternalRequest);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className={`site-header ${className}`.trim()}>
      <div className="site-shell site-header-inner">
        <Link to={logoTo} className="site-logo" aria-label="NextTrip home" onClick={closeMenu}>
          <img src={logo} alt="NextTrip" className="site-logo-img" />
        </Link>

        <nav
          className="site-nav"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              pathname={location.pathname}
              onNavigate={closeMenu}
            />
          ))}
        </nav>

        <div className="site-header-actions">
          {rightSlot ? (
            rightSlot
          ) : (
            <>
              <button type="button" className="site-signin-btn" onClick={handleSignIn}>
                {signInLabel}
              </button>
              {showProfile && profileImageSrc ? (
                <Link to="/profile" className="site-profile-avatar" onClick={closeMenu}>
                  <img src={profileImageSrc} alt={profileAlt} />
                </Link>
              ) : null}
            </>
          )}
          <button
            type="button"
            className="site-menu-toggle"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <SideMenuDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onSignIn={handleSignIn}
      />
    </header>
  );
}
