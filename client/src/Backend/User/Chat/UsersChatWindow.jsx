import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import useConversation from "../../../zustand/useConversation";

const UsersChatWindow = ({ owner, messages }) => {
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
      console.error(error);
    }
  };

  if (!owner) {
    return (
      <div className="flex h-full items-center justify-center">
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
          className="lg:hidden"
        >
          <FaArrowLeft />
        </button>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            owner.fullName
          )}`}
          alt=""
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h2 className="font-semibold">{owner.fullName}</h2>
          <p className="text-sm text-gray-500">{owner.venueName}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
        {messages.map((msg) => {
          const senderId =
            typeof msg.senderId === "object"
              ? msg.senderId?._id
              : msg.senderId;

          const isMine = senderId === currentUser?._id;

          console.log({
            senderId,
            currentUser: currentUser?._id,
            isMine,
            msg,
          });

          return (
            <div
              key={msg._id}
              className={`mb-4 flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-3 shadow ${
                  isMine
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
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
        })}
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-3">
          <input
            className="flex-1 rounded border px-4 py-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />

          <button
            onClick={handleSend}
            className="rounded bg-blue-600 p-4 text-white"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersChatWindow;