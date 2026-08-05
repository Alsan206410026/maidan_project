import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFutbol,
  FaTrophy,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

import MaidanLogo from "../../assets/Maidan_logo.png";

function SuperAdminSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/super-admin-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Manage Users",
      path: "/super-admin/users",
      icon: <FaUsers />,
    },
    {
      name: "Manage Venues",
      path: "/super-admin/venues",
      icon: <FaFutbol />,
    },
    {
      name: "Manage Tournaments",
      path: "/super-admin/tournaments",
      icon: <FaTrophy />,
    },
    {
      name: "Chat",
      path: "/super-admin/chat",
      icon: <FaComments />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt />,
    },
    {
      name: "Home",
      path: "/",
      icon: <FaTachometerAlt />,
    }
    
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= MOBILE HEADER ================= */}

      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 shadow-sm lg:hidden">

        <img
          src={MaidanLogo}
          alt="Maidan Logo"
          className="h-10 w-auto"
        />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-md p-2 hover:bg-gray-100"
        >
          <span className="flex flex-col gap-1">
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
            />

            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                }`}
            />

            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
            />
          </span>
        </button>
      </header>

      {/* Overlay */}

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`

        fixed
        top-16
        right-0
        bottom-0

        z-50

        w-72

        bg-white

        border-l
        border-gray-200

        shadow-xl

        flex
        flex-col

        transition-transform
        duration-300

        ${isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
          }

        lg:top-0
        lg:left-0
        lg:right-auto
        lg:h-screen
        lg:translate-x-0
        lg:border-r
        lg:border-l-0

        `}
      >

        {/* Desktop Header */}

        <div className="hidden lg:block border-b bg-gradient-to-r from-green-700 to-green-600 px-6 py-8">

          <img
            src={MaidanLogo}
            alt=""
            className="mx-auto h-16 rounded-lg bg-white p-2 shadow"
          />

          <h2 className="mt-4 text-center text-2xl font-bold text-white">
            Super Admin
          </h2>

          <p className="mt-1 text-center text-sm text-green-100">
            Sports Management System
          </p>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <ul className="space-y-2">

            {menuItems.map((item) => (

              <li key={item.path}>

                <NavLink
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>

                  <span>{item.name}</span>
                </NavLink>

              </li>

            ))}
          </ul>

        </nav>
        {/* Mobile Drawer Header */}
        <div className="border-b border-gray-200 px-5 py-4 lg:hidden">
          <h2 className="text-lg font-bold text-gray-800">
            Super Admin
          </h2>

          <p className="text-sm text-gray-500">
            Sports Management System
          </p>
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 p-5">
          <p className="text-center text-xs text-gray-500">
            © 2026 Sports Booking System
          </p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main
        className="
          min-h-screen
          pt-20
          px-4
          pb-6

          lg:ml-72
          lg:pt-8
          lg:px-8
        "
      >
        <div className="rounded-2xl bg-white p-5 shadow-sm lg:p-8 min-h-[calc(100vh-7rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SuperAdminSidebar;