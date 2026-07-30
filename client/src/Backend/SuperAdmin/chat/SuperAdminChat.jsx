import React from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "./ChatWindow";

function SuperAdminChat() {
  const { userId } = useParams();

  // Dummy users (Later replace with API)
  const users = [
    {
      _id: "1",
      name: "John Doe",
      role: "User",
      online: true,
    },
    {
      _id: "2",
      name: "Alice Smith",
      role: "Venue Owner",
      online: true,
    },
    {
      _id: "3",
      name: "Michael Johnson",
      role: "Admin",
      online: false,
    },
    {
      _id: "4",
      name: "Sarah Williams",
      role: "User",
      online: true,
    },
  ];

  // Find selected user from URL
  const user = users.find((u) => u._id === userId);

  // Dummy messages (Later replace with API/WebSocket)
  const messages = [
    {
      id: 1,
      text: "Hello Super Admin!",
      mine: false,
      time: "10:20 AM",
    },
    {
      id: 2,
      text: "Hello, how can I help you?",
      mine: true,
      time: "10:21 AM",
    },
    {
      id: 3,
      text: "I have a booking issue.",
      mine: false,
      time: "10:22 AM",
    },
  ];

  const sendMessage = (message) => {
    console.log("Send:", message);

    // Later:
    // socket.send(...)
    // axios.post(...)
  };

  // Invalid URL
  if (!user) {
    return (
      <div className="flex h-[calc(100vh-110px)] items-center justify-center rounded-2xl bg-white shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            User Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            This chat does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ChatWindow
      user={user}
      messages={messages}
      sendMessage={sendMessage}
    />
  );
}

export default SuperAdminChat;