import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaCircle,
} from "react-icons/fa";
import useGetUsersForSidebar from "../../../hooks/useGetUsersForSidebar";

const UsersChatList = () => {
  const [search, setSearch] = useState("");

  const { loading, users } = useGetUsersForSidebar();

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-110px)] items-center justify-center rounded-2xl bg-white shadow-lg">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-110px)] overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Header */}
      <div className="bg-green-700 px-5 py-4">
        <h2 className="text-xl font-bold text-white">Venue Owners</h2>

        <p className="text-sm text-green-100">
          Contact Venue Owner
        </p>
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <div className="flex items-center rounded-xl border bg-gray-50 px-3 py-3">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Users */}
      <div className="h-[calc(100%-145px)] overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <NavLink
              key={user._id}
              to={`/user/chat/${user._id}`}
              className={({ isActive }) =>
                `block transition ${
                  isActive
                    ? "bg-green-100"
                    : "hover:bg-green-50"
                }`
              }
            >
              <div className="flex items-center gap-4 border-b p-4">
                {/* Avatar */}
                <div className="relative">
                  <FaUserCircle className="text-5xl text-green-600" />

                  {/* Placeholder for future online/offline status */}
                  <FaCircle className="absolute bottom-1 right-1 text-[10px] text-gray-400" />
                </div>

                {/* User Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-semibold text-gray-800">
                      {user.fullName}
                    </h3>
                  </div>

                  <p className="truncate text-sm text-gray-500">
                    {user.email}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-400">
                    Click to start chatting
                  </p>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <FaUserCircle className="mb-3 text-6xl text-gray-300" />

            <p>No venue owners found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersChatList;