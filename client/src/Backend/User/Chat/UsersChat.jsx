import React from "react";
import { useParams } from "react-router-dom";
import UsersChatWindow from "./UsersChatWindow";

const UsersChat = () => {
  const { ownerId } = useParams();

  // Dummy Futsal Owners (Replace with API later)
  const owners = [
    {
      _id: "1",
      ownerName: "Raj Yadav",
      futsalName: "Budhhanagar Futsal",
      online: true,
    },
    {
      _id: "2",
      ownerName: "Suman Shrestha",
      futsalName: "Kathmandu Arena",
      online: true,
    },
    {
      _id: "3",
      ownerName: "Bikash KC",
      futsalName: "Lalitpur Futsal",
      online: false,
    },
    {
      _id: "4",
      ownerName: "Anil Gurung",
      futsalName: "Bhaktapur Futsal",
      online: true,
    },
    {
      _id: "5",
      ownerName: "Ramesh Rai",
      futsalName: "Baneshwor Futsal",
      online: false,
    },
  ];

  // Find owner from URL
  const owner = owners.find((item) => item._id === ownerId);

  // Dummy Messages
  const messages = [
    {
      id: 1,
      text: "Hello Sir.",
      mine: true,
      time: "10:20 AM",
    },
    {
      id: 2,
      text: "Hello! Welcome to Budhhanagar Futsal.",
      mine: false,
      time: "10:21 AM",
    },
    {
      id: 3,
      text: "Is the 6 PM slot available tomorrow?",
      mine: true,
      time: "10:22 AM",
    },
    {
      id: 4,
      text: "Yes, it is available.",
      mine: false,
      time: "10:23 AM",
    },
    {
      id: 5,
      text: "Great! Please book it for me.",
      mine: true,
      time: "10:24 AM",
    },
  ];

  const sendMessage = (message) => {
    console.log("Message Sent:", message);

    // Future:
    // socket.emit(...)
    // axios.post(...)
  };

  if (!owner) {
    return (
      <div className="flex h-[calc(100vh-110px)] items-center justify-center rounded-2xl bg-white shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Conversation Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            This futsal owner chat does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <UsersChatWindow
      owner={owner}
      messages={messages}
      sendMessage={sendMessage}
    />
  );
};

export default UsersChat;