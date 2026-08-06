import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import useConversation from "../../../zustand/useConversation";

const AdminChatWindow = ({ user, messages }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const { selectedConversation, setMessages } = useConversation();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5001/api/messages/send/${selectedConversation._id}`,
        {
          message: text,
        },
        {
          withCredentials: true,
        }
      );

      setMessages([...messages, res.data]);

      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Conversation Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            Select a user to start chatting.
          </p>

          <button
            onClick={() => navigate("/admin/chat")}
            className="mt-5 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">

      {/* Header */}
      <div className="flex items-center gap-4 border-b px-5 py-4">
        <button
          onClick={() => navigate("/admin/chat")}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <FaArrowLeft />
        </button>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.fullName
          )}&background=16a34a&color=fff`}
          alt={user.fullName}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h2 className="text-lg font-semibold">
            {user.fullName}
          </h2>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
        {messages.length === 0 ? (
          <div className="mt-20 text-center text-gray-500">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => {
            const senderId =
              typeof msg.senderId === "object"
                ? msg.senderId?._id
                : msg.senderId;

            const isMine = senderId === currentUser?._id;

            console.log({
              senderId,
              currentUser: currentUser?._id,
              isMine,
            });

            return (
              <div
                key={msg._id}
                className={`mb-4 flex ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-3 shadow md:max-w-md ${
                    isMine
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>

                  <p
                    className={`mt-2 text-right text-xs ${
                      isMine
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
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
            className="rounded-xl bg-blue-600 p-4 text-white hover:bg-blue-700"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChatWindow;