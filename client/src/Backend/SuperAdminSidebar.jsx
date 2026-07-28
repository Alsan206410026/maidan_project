import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFutbol,
  FaTrophy,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

function SuperAdminSidebar() {
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
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-green-700 via-green-800 to-green-900 text-white shadow-2xl">

        {/* Logo */}
        <div className="border-b border-green-600 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-green-700">
              ⚽
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Super Admin
              </h1>

              <p className="text-sm text-green-200">
                Sports Management System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-green-500 text-white shadow-lg"
                        : "text-green-100 hover:bg-green-600 hover:translate-x-1"
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-green-700 p-5">
          <p className="text-center text-xs text-green-300">
            © 2026 Sports Booking System
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default SuperAdminSidebar;