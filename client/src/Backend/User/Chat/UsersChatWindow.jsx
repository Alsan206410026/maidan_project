import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaUserCircle,
  FaCircle,
} from "react-icons/fa";

const UsersChatWindow = ({ owner, messages = [], sendMessage }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  if (!owner) {
    return (
      <div className="flex h-[calc(100vh-110px)] items-center justify-center rounded-2xl bg-white shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Conversation Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            This conversation doesn't exist.
          </p>

          <button
            onClick={() => navigate("/user/chat")}
            className="mt-5 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
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
          onClick={() => navigate("/user/chat")}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <FaArrowLeft />
        </button>

        <div className="relative">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              owner.ownerName
            )}&background=16a34a&color=fff`}
            alt={owner.ownerName}
            className="h-12 w-12 rounded-full"
          />

          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              owner.online ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>

        <div>
          <h2 className="text-lg font-semibold">{owner.ownerName}</h2>

          <p className="text-sm text-gray-500">
            {owner.futsalName}
          </p>

          <p
            className={`text-xs ${
              owner.online ? "text-green-600" : "text-gray-400"
            }`}
          >
            {owner.online ? "Online" : "Offline"}
          </p>
        </div>

      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">

        {messages.length === 0 ? (
          <div className="mt-20 text-center text-gray-500">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 flex ${
                msg.mine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-3 shadow md:max-w-md ${
                  msg.mine
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p>{msg.text}</p>

                <p
                  className={`mt-2 text-right text-xs ${
                    msg.mine
                      ? "text-green-100"
                      : "text-gray-400"
                  }`}
                >
                  {msg.time}
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
};

export default UsersChatWindow;