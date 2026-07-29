import React, { useState } from "react";
import {
  FaPaperPlane,
  FaSearch,
  FaCircle,
  FaUserCircle,
} from "react-icons/fa";

function SuperAdminChat() {
  const [message, setMessage] = useState("");

  const users = [
    {
      id: 1,
      name: "John Doe",
      role: "User",
      online: true,
    },
    {
      id: 2,
      name: "Alice Smith",
      role: "Venue Owner",
      online: true,
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Admin",
      online: false,
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "User",
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      text: "Hello Super Admin!",
      time: "10:20 AM",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Hello John, how can I help you?",
      time: "10:21 AM",
      mine: true,
    },
    {
      id: 3,
      sender: "John Doe",
      text: "I'm having trouble booking a venue.",
      time: "10:22 AM",
      mine: false,
    },
  ];

  return (
    <div className="h-[85vh] rounded-xl bg-white shadow-lg overflow-hidden">
      <div className="grid h-full grid-cols-12">
        {/* Left Sidebar */}
        <div className="col-span-4 border-r bg-gray-50">
          <div className="border-b p-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Chats
            </h2>

            <div className="mt-4 flex items-center rounded-lg border bg-white px-3 py-2">
              <FaSearch className="text-gray-400" />

              <input
                type="text"
                placeholder="Search users..."
                className="ml-3 w-full outline-none"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex cursor-pointer items-center gap-3 border-b p-4 transition hover:bg-green-50"
              >
                <FaUserCircle className="text-5xl text-gray-500" />

                <div className="flex-1">
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="text-sm text-gray-500">
                    {user.role}
                  </p>
                </div>

                <FaCircle
                  className={`text-xs ${
                    user.online
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-8 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b p-4">
            <FaUserCircle className="text-5xl text-green-600" />

            <div>
              <h2 className="text-lg font-bold">John Doe</h2>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-100 p-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.mine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-xl px-4 py-3 shadow ${
                    msg.mine
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                >
                  <p>{msg.text}</p>

                  <p
                    className={`mt-2 text-right text-xs ${
                      msg.mine
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-green-500"
              />

              <button className="rounded-lg bg-green-600 p-4 text-white transition hover:bg-green-700">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminChat;