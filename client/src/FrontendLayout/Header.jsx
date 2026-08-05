import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MaidanLogo from "../assets/Maidan_logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  // Re-run this check every time the route/location changes
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);

      // Set the correct dashboard route based on the user's role
      if (role === "super_admin") {
        setDashboardPath("/super-admin-dashboard");
      } else if (role === "admin") {
        setDashboardPath("/admin-dashboard");
      } else {
        setDashboardPath("/user-dashboard");
      }
    } else {
      setIsLoggedIn(false);
      setDashboardPath("/");
    }
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `${
      isMenuOpen
        ? `block px-4 py-3 rounded-md ${
            isActive
              ? "bg-green-100 text-primary font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`
        : `transition-colors ${
            isActive
              ? "text-primary font-semibold"
              : "text-gray-700 hover:text-primary"
          }`
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div
          className={`relative max-w-7xl mx-auto px-4 flex items-center justify-between h-20`}
        >
          {/* Logo */}
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src={MaidanLogo}
              alt="Maidan Logo"
              className="h-14 w-auto"
            />
          </NavLink>

          {/* Navigation */}
          <nav>
            <ul
              className={`font-medium ${
                isMenuOpen
                  ? "absolute top-full left-0 right-0 bg-white border-t shadow-lg py-4 space-y-2 z-50"
                  : "hidden lg:flex items-center gap-8"
              }`}
            >
              <li className={isMenuOpen ? "mx-4" : ""}>
                <NavLink
                  to="/"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>

              <li className={isMenuOpen ? "mx-4" : ""}>
                <NavLink
                  to="/venues"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Venues
                </NavLink>
              </li>

              <li className={isMenuOpen ? "mx-4" : ""}>
                <NavLink
                  to="/tournaments"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tournaments
                </NavLink>
              </li>

              <li className={isMenuOpen ? "mx-4" : ""}>
                <NavLink
                  to="/about"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>

              <li className={isMenuOpen ? "mx-4" : ""}>
                <NavLink
                  to="/contact"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>

              {/* Mobile and tab Login/Register or Dashboard/Logout */}
              {isMenuOpen && (
                <li className="px-4 pt-3 lg:hidden border-t flex flex-col gap-2 md:flex-row md:justify-center md:gap-3 ">
                  {isLoggedIn ? (
                    <>
                      <NavLink
                        to={dashboardPath}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="w-full rounded-md border border-primary px-4 py-3 font-semibold text-primary transition hover:bg-green-600 hover:text-white">
                          Dashboard
                        </button>
                      </NavLink>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full rounded-md border border-primary px-4 py-3 font-semibold text-primary transition hover:bg-green-600 hover:text-white"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="w-full rounded-md border border-primary px-4 py-3 font-semibold text-primary transition hover:bg-green-600 hover:text-white">
                          Login
                        </button>
                      </NavLink>

                      <NavLink
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="w-full rounded-md border border-primary px-4 py-3 font-semibold text-primary transition hover:bg-green-600 hover:text-white">
                          Register
                        </button>
                      </NavLink>
                    </>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {/* Desktop Login/Register or Dashboard/Logout */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <NavLink to={dashboardPath}>
                  <button className="rounded-md border border-primary px-4 py-2 font-semibold text-primary transition hover:bg-green-600 hover:text-white">
                    Dashboard
                  </button>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="rounded-md border border-primary px-4 py-2 font-semibold text-primary transition hover:bg-green-600 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="rounded-md border border-primary px-4 py-2 font-semibold text-primary transition hover:bg-green-600 hover:text-white">
                    Login
                  </button>
                </NavLink>

                <NavLink to="/register">
                  <button className="rounded-md border border-primary px-4 py-2 font-semibold text-primary transition hover:bg-green-600 hover:text-white">
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="flex flex-col gap-1">
              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              ></span>

              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              ></span>
            </span>
          </button>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 top-20 bg-black/30 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
}

export default Header;