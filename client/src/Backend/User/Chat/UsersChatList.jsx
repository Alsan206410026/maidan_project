import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCircle } from "react-icons/fa";

import useGetAdminsForSidebar from "../../../hooks/useGetAdminsForSidebar";
import useConversation from "../../../zustand/useConversation";
import useSocket from "../../../hooks/useSocket";

const UsersChatList = () => {
  const [search, setSearch] = useState("");

  const { loading, admins } = useGetAdminsForSidebar();
  const { setSelectedConversation } = useConversation();
  const { onlineUsers = [] } = useSocket() || {};

  const filteredAdmins = (admins || []).filter((venue) => {
    const searchText = search.toLowerCase();

    const adminName = venue.admin?.fullName?.toLowerCase() || "";
    const adminEmail = venue.admin?.email?.toLowerCase() || "";
    const venueName = venue.name?.toLowerCase() || "";

    return (
      adminName.includes(searchText) ||
      adminEmail.includes(searchText) ||
      venueName.includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl bg-white shadow-lg">
      {/* Header */}
      <div className="rounded-t-2xl bg-green-600 p-5 text-white">
        <h2 className="text-xl font-bold">Venue Owners</h2>
        <p className="text-sm text-green-100">Contact Venue Owner</p>
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <div className="flex items-center rounded-xl border bg-gray-50 px-3 py-3">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by owner, email or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>

      {/* List */}
      <div className="h-[calc(100%-145px)] overflow-y-auto">
        {filteredAdmins.length > 0 ? (
          filteredAdmins.map((venue) => {
            const adminId = venue.admin?._id;
            const isOnline = onlineUsers.includes(adminId);

            return (
              <NavLink
                key={venue._id || adminId}
                to={`/user/chat/${adminId}`}
                onClick={() =>
                  setSelectedConversation({
                    _id: adminId,
                    fullName: venue.admin?.fullName,
                    email: venue.admin?.email,
                    venueName: venue.name,
                  })
                }
                className={({ isActive }) =>
                  `block transition ${
                    isActive ? "bg-green-100" : "hover:bg-green-50"
                  }`
                }
              >
                <div className="flex items-center gap-4 border-b p-4">
                  <div className="relative">
                    <FaUserCircle className="text-5xl text-green-600" />
                    <FaCircle
                      className={`absolute bottom-1 right-1 text-[10px] ${
                        isOnline ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-800">
                      {venue.admin?.fullName || "Venue Admin"}
                    </h3>
                    <p className="truncate text-sm text-gray-500">
                      {venue.admin?.email}
                    </p>
                    <p className="mt-1 truncate text-xs font-medium text-green-600">
                      {venue.name} Admin
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })
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