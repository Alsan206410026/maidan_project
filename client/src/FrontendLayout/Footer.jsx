import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/Maidan_logo.png"
                alt="Maidan Logo"
                className="w-16 h-16"
              />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Nepal's premier sports venue booking platform.
              Find, book, and play at top venues near you.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/venues"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Venues
                </Link>
              </li>

              <li>
                <Link
                  to="/tournaments"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Tournaments
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Venues */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              For Venues
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  List Your Venue
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Venue Dashboard
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Subscription Plans
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Promote Your Venue
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </div>
                    {/* Contact Us */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-gray-400">
                <span className="text-primary">📍</span>
                <span>Block 14, kathmandu, Nepal</span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-400">
                <span className="text-primary">📞</span>
                <span>+977-9817077458</span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-400">
                <span className="text-primary">✉️</span>
                <span>hello@maidaan.np</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Maidaan. All rights reserved.</span>

          <div className="flex gap-4">
            <Link
              to="/privacy-policy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;