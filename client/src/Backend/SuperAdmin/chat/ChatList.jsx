import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaCircle,
} from "react-icons/fa";

function ChatList() {
  const [search, setSearch] = useState("");

  // Dummy users (Replace with API later)
  const users = [
    {
      _id: "1",
      name: "John Doe",
      role: "User",
      online: true,
      lastMessage: "Hello Super Admin",
    },
    {
      _id: "2",
      name: "Alice Smith",
      role: "Venue Owner",
      online: true,
      lastMessage: "Need help with booking",
    },
    {
      _id: "3",
      name: "Michael Johnson",
      role: "Admin",
      online: false,
      lastMessage: "Thank you",
    },
    {
      _id: "4",
      name: "Sarah Williams",
      role: "User",
      online: true,
      lastMessage: "Booking completed",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-110px)] rounded-2xl bg-white shadow-lg overflow-hidden">

      {/* Header */}

      <div className="border-b bg-green-700 px-5 py-4">

        <h2 className="text-xl font-bold text-white">
          Chats
        </h2>

        <p className="text-sm text-green-100">
          Sports Management System
        </p>

      </div>

      {/* Search */}

      <div className="border-b p-4">

        <div className="flex items-center rounded-xl border bg-gray-50 px-3 py-3">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none"
          />

        </div>

      </div>

      {/* Users */}

      <div className="overflow-y-auto h-[calc(100%-140px)]">

        {filteredUsers.map((user) => (

          <NavLink
            key={user._id}
            to={`/super-admin/chat/${user._id}`}
            className="block"
          >

            <div className="flex items-center gap-4 border-b p-4 transition hover:bg-green-50">

              <div className="relative">

                <FaUserCircle className="text-5xl text-green-600" />

                <FaCircle
                  className={`absolute bottom-1 right-1 text-[10px] ${
                    user.online
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />

              </div>

              <div className="flex-1">

                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.role}
                </p>

                <p className="mt-1 text-xs text-gray-400 truncate">
                  {user.lastMessage}
                </p>

              </div>

            </div>

          </NavLink>

        ))}

        {filteredUsers.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No users found.
          </div>
        )}

      </div>

    </div>
  );
}

export default ChatList;