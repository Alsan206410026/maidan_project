import { useEffect } from "react";
import axios from "axios";

import useConversation from "../../../zustand/useConversation";
import AdminChatWindow from "./AdminChatWindow";

const AdminChat = () => {
  const {
    selectedConversation,
    messages,
    setMessages,
  } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;

      try {
        const res = await axios.get(
          `http://localhost:5001/api/messages/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );

        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return (
    <AdminChatWindow
      user={selectedConversation}
      messages={messages}
    />
  );
};

export default AdminChat;