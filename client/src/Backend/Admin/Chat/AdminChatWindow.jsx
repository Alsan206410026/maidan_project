import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaUserCircle,
  FaCircle,
} from "react-icons/fa";

function AdminChatWindow({ user, messages, sendMessage }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-110px)] items-center justify-center rounded-2xl bg-white shadow-lg">
        <div className="text-center">

          <FaUserCircle className="mx-auto text-7xl text-gray-300" />

          <h2 className="mt-4 text-2xl font-bold text-gray-700">
            Chat Not Found
          </h2>

          <button
            onClick={() => navigate("/admin/chat")}
            className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Back to Chats
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-110px)] flex-col overflow-hidden rounded-2xl bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center gap-4 border-b bg-white px-5 py-4">

        <button
          onClick={() => navigate("/admin/chat")}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <FaArrowLeft />
        </button>

        <div className="relative">

          <FaUserCircle className="text-5xl text-green-600" />

          <FaCircle
            className={`absolute bottom-1 right-1 text-[10px]
            ${user.online ? "text-green-500" : "text-gray-400"}`}
          />

        </div>

        <div>

          <h2 className="text-lg font-semibold">
            {user.name}
          </h2>

          <p className="text-sm text-gray-500">
            {user.role}
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">

        {messages.length === 0 ? (

          <div className="mt-24 text-center text-gray-500">
            No messages yet.
          </div>

        ) : (

          messages.map((message) => (

            <div
              key={message.id}
              className={`mb-4 flex ${
                message.mine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-xs rounded-2xl px-4 py-3 shadow md:max-w-md
                ${
                  message.mine
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >

                <p>{message.text}</p>

                <p
                  className={`mt-2 text-right text-xs
                  ${
                    message.mine
                      ? "text-green-100"
                      : "text-gray-400"
                  }`}
                >
                  {message.time}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Input */}

      <div className="border-t bg-white p-4">

        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />

          <button
            onClick={handleSend}
            className="rounded-xl bg-green-600 p-4 text-white hover:bg-green-700"
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminChatWindow;