import React from "react";
import { useParams } from "react-router-dom";
import AdminChatWindow from "./AdminChatWindow";

function AdminChat() {
  const { userId } = useParams();

  // Dummy users (Replace with API later)
  const users = [
    {
      _id: "1",
      name: "Super Admin",
      role: "Super Admin",
      online: true,
    },
    {
      _id: "2",
      name: "Ram Sharma",
      role: "Customer",
      online: true,
    },
    {
      _id: "3",
      name: "Hari KC",
      role: "Customer",
      online: false,
    },
    {
      _id: "4",
      name: "Suman Thapa",
      role: "Customer",
      online: true,
    },
    {
      _id: "5",
      name: "Anish Gurung",
      role: "Customer",
      online: true,
    },
  ];

  // Find selected user
  const user = users.find((u) => u._id === userId);

  // Dummy messages (Replace with API/WebSocket later)
  const messages = [
    {
      id: 1,
      text: "Hello!",
      mine: false,
      time: "10:10 AM",
    },
    {
      id: 2,
      text: "Hello, how can I help you?",
      mine: true,
      time: "10:11 AM",
    },
    {
      id: 3,
      text: "I want to change my booking time.",
      mine: false,
      time: "10:12 AM",
    },
  ];

  const sendMessage = (message) => {
    console.log("Message:", message);

    // Later:
    // socket.emit(...)
    // axios.post(...)
  };

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-110px)] items-center justify-center rounded-2xl bg-white shadow-lg">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-red-600">
            Chat Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            This conversation doesn't exist.
          </p>

        </div>

      </div>
    );
  }

  return (
    <AdminChatWindow
      user={user}
      messages={messages}
      sendMessage={sendMessage}
    />
  );
}

export default AdminChat;