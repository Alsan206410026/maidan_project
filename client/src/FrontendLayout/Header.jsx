import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const navClass = ({ isActive }) =>
    `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? "bg-green-100 text-primary"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2.5 cursor-pointer">
              <img
                src="/Maidan_logo.png"
                alt="Maidan Logo"
                className="w-16 h-16"
              />
            </NavLink>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>

              <NavLink to="/venues" className={navClass}>
                Venues
              </NavLink>

              <NavLink to="/tournaments" className={navClass}>
                Tournaments
              </NavLink>

              <NavLink to="/about" className={navClass}>
                About
              </NavLink>

              <NavLink to="/contact" className={navClass}>
                Contact
              </NavLink>
            </div>

            {/* Auth Links */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                Log In
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer px-3 py-1.5 text-sm bg-primary text-primary-foreground hover:bg-green-700 shadow-sm hover:shadow-md"
              >
                Register
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;