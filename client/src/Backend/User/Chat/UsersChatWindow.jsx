import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import useConversation from "../../../zustand/useConversation";

const UsersChatWindow = ({ owner, messages = [] }) => {
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

  if (!owner) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Conversation Not Found
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-white px-5 py-4">
        <button
          onClick={() => navigate("/user/chat")}
          className="lg:hidden text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
        </button>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            owner?.fullName || "User"
          )}`}
          alt={owner?.fullName || "Avatar"}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h2 className="font-semibold text-gray-800">{owner?.fullName}</h2>
          <p className="text-sm text-gray-500">{owner?.venueName}</p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
        {messages.map((msg) => {
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
                className={`max-w-xs rounded-2xl px-4 py-3 shadow ${
                  isMine
                    ? "bg-blue-600 text-white"   // MY MESSAGE: Right, Blue
                    : "bg-white text-black"     // OTHER MESSAGE: Left, White
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
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsersChatWindow;