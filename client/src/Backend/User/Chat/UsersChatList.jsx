import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCircle } from "react-icons/fa";

const UsersChatList = () => {
  const [search, setSearch] = useState("");

  // Dummy Owners
  const owners = [
    {
      _id: "1",
      ownerName: "Raj Yadav",
      futsalName: "Budhanagar Futsal",
      online: true,
      lastMessage: "Your booking has been confirmed.",
    },
    {
      _id: "2",
      ownerName: "Suman Shrestha",
      futsalName: "Kathmandu Arena",
      online: false,
      lastMessage: "Tomorrow's slot is available.",
    },
    {
      _id: "3",
      ownerName: "Bikash KC",
      futsalName: "Lalitpur Futsal",
      online: true,
      lastMessage: "Please arrive 15 minutes early.",
    },
    {
      _id: "4",
      ownerName: "Anil Gurung",
      futsalName: "Bhaktapur Futsal",
      online: true,
      lastMessage: "Thank you for booking.",
    },
    {
      _id: "5",
      ownerName: "Ramesh Rai",
      futsalName: "Baneshwor Futsal",
      online: false,
      lastMessage: "Can I help you?",
    },
  ];

  const filteredOwners = owners.filter(
    (owner) =>
      owner.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      owner.futsalName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-110px)] overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Header */}
      <div className="bg-green-700 px-5 py-4">
        <h2 className="text-xl font-bold text-white">
          Futsal Owners
        </h2>

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
            placeholder="Search owner or futsal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Owner List */}
      <div className="h-[calc(100%-145px)] overflow-y-auto">
        {filteredOwners.length > 0 ? (
          filteredOwners.map((owner) => (
            <NavLink
              key={owner._id}
              to={`/user/chat/${owner._id}`}
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
                      owner.online
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-semibold">
                      {owner.ownerName}
                    </h3>

                    {owner.online && (
                      <span className="text-xs text-green-600">
                        Online
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    {owner.futsalName}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-400">
                    {owner.lastMessage}
                  </p>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <FaUserCircle className="mb-3 text-6xl text-gray-300" />
            <p>No futsal owners found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersChatList;