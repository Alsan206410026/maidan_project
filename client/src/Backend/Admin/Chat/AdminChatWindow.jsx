import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import useConversation from "../../../zustand/useConversation";

const AdminChatWindow = ({ user, messages = [] }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const { selectedConversation, setMessages } = useConversation();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim() || !selectedConversation?._id) return;

    try {
      const res = await axios.post(
        `http://localhost:5001/api/messages/send/${selectedConversation._id}`,
        { message: text },
        { withCredentials: true }
      );

      const newMsg = res.data.data || res.data;
      setMessages([...messages, newMsg]);
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Conversation Not Found</h2>
          <p className="mt-2 text-gray-500">Select a user to start chatting.</p>
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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-white px-5 py-4">
        <button
          onClick={() => navigate("/admin/chat")}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden text-gray-600"
        >
          <FaArrowLeft />
        </button>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.fullName || "User"
          )}&background=16a34a&color=fff`}
          alt={user.fullName}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.fullName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
        {messages.length === 0 ? (
          <div className="mt-20 text-center text-gray-500">
            No messages yet. Say hello!
          </div>
        ) : (
          messages.map((msg) => {
            const rawSenderId =
              typeof msg.senderId === "object" ? msg.senderId?._id : msg.senderId;
            const currentUserId = currentUser?._id || currentUser?.id;

            const isMine = String(rawSenderId) === String(currentUserId);

            return (
              <div
                key={msg._id || Math.random()}
                className={`mb-4 flex ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-3 shadow md:max-w-md ${
                    isMine
                      ? "bg-blue-600 text-white"      // ADMIN MESSAGE: Right, Blue
                      : "bg-white text-gray-800"    // CUSTOMER MESSAGE: Left, White
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p
                    className={`mt-2 text-right text-[10px] ${
                      isMine ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 p-4 text-white hover:bg-blue-700 transition"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChatWindow;