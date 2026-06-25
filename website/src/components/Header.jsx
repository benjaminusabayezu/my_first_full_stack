import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Globe, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingModal from "./reusables/LoadingModal";
import { loginUser } from "../api/authApi";

// ─── constants ────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Skills", "Experience"];

// Items that go to their own page (via the loading modal) instead of
// scrolling to an in-page section.
const NAV_ROUTES = {
  Skills: "/skills",
  
};

const spring = { type: "spring", stiffness: 120, damping: 22 };

// ─── helpers ──────────────────────────────────────────────────────────────────
const NavLink = ({ item, index, onClick }) => (
  <motion.a
    key={item}
    href={NAV_ROUTES[item] ?? `#${item.toLowerCase()}`}
    onClick={onClick}
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...spring, delay: 0.5 + index * 0.1 }}
    className="relative px-2 py-1 text-zinc-400 hover:text-lime-400
      font-medium text-sm transition-colors duration-200 group"
  >
    {item}
    <span
      className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime-400
        group-hover:w-full transition-all duration-300"
    />
  </motion.a>
);

// ─── main component ───────────────────────────────────────────────────────────
const Header = () => {
  const shouldReduce = useReducedMotion();

  // scroll-aware backdrop
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // login modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setMenuOpen(false);
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [modalOpen, closeModal]);

  // focus trap in modal
  const modalRef = useRef(null);
  useEffect(() => {
    if (modalOpen && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, input, a[href], [tabindex]:not([tabindex="-1"])',
      );
      focusable[0]?.focus();
    }
  }, [modalOpen]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Skills / Experience go through the same loading modal used for sign-in
  // before swapping routes. Home / About keep their normal in-page anchors.
  const handleNavClick = useCallback(
    (e, item) => {
      const route = NAV_ROUTES[item];
      if (!route) {
        closeMenu();
        return;
      }
      e.preventDefault();
      closeMenu();
      setMessage(`Loading ${item}...`);
      setLoading(true);

      setTimeout(() => {
        navigate(route);
        setLoading(false);
      }, 2000);
    },
    [navigate, closeMenu],
  );

  // form state
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState("");
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setFormError("Please fill in both fields.");
      return;
    }
try {
  setFormError("");
  setLoading(true);
  setMessage("Signing in...");

  // console.log("Sending login request:", {
  //   username: form.username,
  //   password: form.password,
  // });

  const data = await loginUser({
    username: form.username,
    password: form.password,
  });

  // console.log("LOGIN RESPONSE:", data);
  // console.log("ACCESS TOKEN:", data?.access);
  // console.log("REFRESH TOKEN:", data?.refresh);
  // console.log("USER DATA:", data?.user);

localStorage.setItem("access", data.access);
localStorage.setItem("refresh", data.refresh);
localStorage.setItem("user", JSON.stringify(data.user));

// console.log("LOCALSTORAGE ACCESS:", localStorage.getItem("access"));

// console.log("LOCALSTORAGE USER:", localStorage.getItem("user"));

  setModalOpen(false);

  console.log("NAVIGATING... ROLE:", data?.user?.role);

  if (data?.user?.role === "admin") {
    console.log("Going to /admin");
    navigate("/admin", { replace: true });
  } else {
    // console.log("Going to /dashboard");
    navigate("/UnderDevelopment", { replace: true });
  }
} catch (error) {
  // console.log("LOGIN ERROR FULL:", error);
  // console.log("RESPONSE DATA:", error.response?.data);

  setFormError(
    error.response?.data?.detail ||
      error.response?.data?.non_field_errors?.[0] ||
      "Invalid username or password.",
  );
} finally {
  setLoading(false);
  // console.log("LOGIN PROCESS FINISHED");
}
};

  return (
    <>
      <LoadingModal isOpen={loading} message={message} />

      {/* ── header bar ─────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="flex items-center gap-2.5 group"
            aria-label="BIntern — home"
          >
            <div
              className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700
                flex items-center justify-center text-lime-400 font-bold text-lg
                group-hover:border-lime-500 transition-colors duration-200"
            >
              B
            </div>
            <span className="text-lg font-bold text-zinc-100 group-hover:text-lime-400 transition-colors duration-200">
              BIntern
            </span>
          </motion.a>

          {/* desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item, i) => (
              <NavLink
                key={item}
                item={item}
                index={i}
                onClick={(e) => handleNavClick(e, item)}
              />
            ))}
          </nav>

          {/* desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {[
              { href: "mailto:you@email.com", icon: Mail, label: "Email" },
              { href: "#", icon: Globe, label: "Website" },
            ].map(({ href, icon: Icon, label }, i) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: 1.1 + i * 0.12 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  text-zinc-500 hover:text-lime-400 hover:bg-zinc-800
                  transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}

            <motion.button
              onClick={openModal}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 1.35 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="ml-1 px-4 py-2 rounded-lg bg-lime-400 text-zinc-900
                font-semibold text-sm hover:bg-lime-300 transition-colors duration-200"
            >
              Admin Portal
            </motion.button>
          </div>

          {/* mobile toggle */}
          <motion.button
            className="md:hidden w-9 h-9 flex items-center justify-center
              rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800
              transition-all duration-200"
            onClick={toggleMenu}
            whileTap={{ scale: 0.88 }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-zinc-900/95 backdrop-blur-md
                border-t border-zinc-800"
            >
              <nav
                className="flex flex-col px-5 pt-3 pb-2"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((item) => (
                  <a
                    key={item}
                    href={NAV_ROUTES[item] ?? `#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className="py-3 text-zinc-300 hover:text-lime-400 font-medium text-sm
                      border-b border-zinc-800 last:border-0 transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3 px-5 py-4">
                <a
                  href="mailto:you@email.com"
                  aria-label="Email"
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                    text-zinc-500 hover:text-lime-400 hover:bg-zinc-800 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Website"
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                    text-zinc-500 hover:text-lime-400 hover:bg-zinc-800 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <button
                  onClick={openModal}
                  className="ml-auto px-4 py-2 rounded-lg bg-lime-400 text-zinc-900
                    font-semibold text-sm hover:bg-lime-300 transition-colors duration-200"
                >
                  Admin Portal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── login modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm
              flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            aria-hidden="true"
          >
            <motion.div
              ref={modalRef}
              key="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ ...spring, duration: 0.35 }}
              className="w-full max-w-sm bg-zinc-900 border border-zinc-800
                rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-lime-400 via-lime-300 to-lime-600" />

              <div className="p-7">
                {/* header row */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <p className="text-xs font-semibold text-lime-400 uppercase tracking-widest mb-1">
                      Admin Portal
                    </p>
                    <h2
                      id="modal-title"
                      className="text-2xl font-bold text-zinc-100"
                    >
                      Welcome back.
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    aria-label="Close login modal"
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                      text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800
                      transition-all duration-200 mt-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* form */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="admin@internaship.com"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700
                        text-zinc-100 placeholder-zinc-600 text-sm
                        focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent
                        transition-all duration-200"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700
                        text-zinc-100 placeholder-zinc-600 text-sm
                        focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent
                        transition-all duration-200"
                    />
                  </div>

                  {/* inline error */}
                  <AnimatePresence>
                    {formError && (
                      <motion.p
                        key="form-error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-xs text-red-400"
                        role="alert"
                      >
                        {formError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-1 w-full py-3 rounded-lg bg-lime-400 text-zinc-900
                      font-semibold text-sm hover:bg-lime-300
                      transition-colors duration-200"
                  >
                    Sign in
                  </motion.button>
                </form>

                <div className="mt-5 flex items-center justify-between">
                  <a
                    href="#"
                    className="text-xs text-zinc-500 hover:text-lime-400
                      transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                  <span className="text-xs text-zinc-700">Admins only</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
