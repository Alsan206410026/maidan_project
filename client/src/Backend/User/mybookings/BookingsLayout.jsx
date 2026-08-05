import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function BookingsLayout() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {/* Navigation Menu Header */}
      <div className="flex border-b border-gray-200 mb-6 space-x-6">
        <NavLink
          to="paid"
          className={({ isActive }) =>
            `pb-2 px-1 text-sm font-semibold border-b-2 transition-all ${
              isActive
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`
          }
        >
          Paid / Active
        </NavLink>

        <NavLink
          to="pending"
          className={({ isActive }) =>
            `pb-2 px-1 text-sm font-semibold border-b-2 transition-all ${
              isActive
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`
          }
        >
          Pending / Cash
        </NavLink>

        <NavLink
          to="history"
          className={({ isActive }) =>
            `pb-2 px-1 text-sm font-semibold border-b-2 transition-all ${
              isActive
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`
          }
        >
          History
        </NavLink>
      </div>

    {/* sub page content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default BookingsLayout;