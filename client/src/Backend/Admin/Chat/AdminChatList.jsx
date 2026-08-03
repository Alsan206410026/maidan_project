import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCircle } from "react-icons/fa";

function AdminChatList() {
  const [search, setSearch] = useState("");

  // Dummy users (Replace with API later)
  const users = [
    {
      _id: "1",
      name: "Super Admin",
      role: "Super Admin",
      online: true,
      lastMessage: "Please verify today's bookings."
    },
    {
      _id: "2",
      name: "Ram Sharma",
      role: "Customer",
      online: true,
      lastMessage: "Can I reschedule my booking?"
    },
    {
      _id: "3",
      name: "Hari KC",
      role: "Customer",
      online: false,
      lastMessage: "Thank you!"
    },
    {
      _id: "4",
      name: "Suman Thapa",
      role: "Customer",
      online: true,
      lastMessage: "Booking completed."
    },
    {
      _id: "5",
      name: "Anish Gurung",
      role: "Customer",
      online: true,
      lastMessage: "Is parking available?"
    }
  ];

  return (
    <div className="h-[calc(100vh-110px)] overflow-hidden rounded-2xl bg-white shadow-lg">

      {/* Header */}

      <div className="border-b bg-green-700 px-5 py-4">
        <h2 className="text-xl font-bold text-white">
          Chats
        </h2>

        <p className="text-sm text-green-100">
          Venue Management
        </p>
      </div>

      {/* Search */}

      <div className="border-b p-4">

        <div className="flex items-center rounded-xl border bg-gray-50 px-3 py-3">

          <FaSearch className="text-gray-400"/>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none"
          />

        </div>

      </div>

      {/* Users */}

      <div className="h-[calc(100%-140px)] overflow-y-auto">

        {/* Show up to four users */}
        {users && users.length > 0 ? (
          users.slice(0, 4).map((user) => (
            <NavLink key={user._id} to={`/admin/chat/${user._id}`} className="block">
              {({ isActive }) => (
                <div
                  className={`flex items-center gap-4 border-b p-4 transition ${
                    isActive ? "bg-green-100" : "hover:bg-green-50"
                  }`}
                >
                  <div className="relative">
                    <FaUserCircle className="text-5xl text-green-600" />
                    <FaCircle
                      className={`absolute bottom-1 right-1 text-[10px] ${
                        user.online ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      {user.online && <span className="text-xs text-green-600">Online</span>}
                    </div>

                    <p className="text-sm text-gray-500">{user.role}</p>

                    <p className="mt-1 truncate text-xs text-gray-400">{user.lastMessage}</p>
                  </div>
                </div>
              )}
            </NavLink>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500">
            <FaUserCircle className="mx-auto mb-3 text-6xl text-gray-300" />
            <p>No chats found.</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default AdminChatList;