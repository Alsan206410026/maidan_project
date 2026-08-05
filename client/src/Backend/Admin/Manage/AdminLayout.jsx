import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="p-5 font-sans max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 m-0">Admin Dashboard</h2>
      <hr className="my-4 border-slate-200" />

      {/* Top Navigation Links */}
      <nav className="flex gap-5 mb-8">
        <NavLink
          to="bookings"
          className={({ isActive }) =>
            `px-5 py-2.5 no-underline font-bold rounded-md transition ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`
          }
        >
          Manage Bookings
        </NavLink>

        <NavLink
          to="timeslots"
          className={({ isActive }) =>
            `px-5 py-2.5 no-underline font-bold rounded-md transition ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`
          }
        >
          Manage Time Slots
        </NavLink>
      </nav>

      {/* Render the nested routes */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;