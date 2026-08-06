import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCircle } from "react-icons/fa";

import useGetUsersForSidebar from "../../../hooks/useGetUsersForSidebar";
import useConversation from "../../../zustand/useConversation";

const AdminChatList = () => {
  const [search, setSearch] = useState("");

  const { loading, users } = useGetUsersForSidebar();

  const { setSelectedConversation } = useConversation();

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.fullName?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl bg-white shadow-lg">
      {/* Header */}
      <div className="rounded-t-2xl bg-green-600 p-5 text-white">
        <h2 className="text-xl font-bold">Users</h2>

        <p className="text-sm text-green-100">
          Chat with your customers
        </p>
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <div className="flex items-center rounded-xl border bg-gray-50 px-3 py-3">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* User List */}
      <div className="h-[calc(100%-145px)] overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <NavLink
              key={user._id}
              to={`/admin/chat/${user._id}`}
              onClick={() =>
                setSelectedConversation({
                  _id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                })
              }
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

                  <FaCircle className="absolute bottom-1 right-1 text-[10px] text-gray-400" />
                </div>

                {/* User Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-800">
                    {user.fullName}
                  </h3>

                  <p className="truncate text-sm text-gray-500">
                    {user.email}
                  </p>

                  <p className="mt-1 text-xs font-medium text-green-600">
                    Customer
                  </p>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <FaUserCircle className="mb-3 text-6xl text-gray-300" />

            <p>No users available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatList;