import { useEffect } from "react";
import axios from "axios";

import useConversation from "../../../zustand/useConversation";
import useListenMessages from "../../../hooks/useListenMessages";
import AdminChatWindow from "./AdminChatWindow";

const AdminChat = () => {
  const { selectedConversation, messages, setMessages } = useConversation();

  useListenMessages();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5001/api/messages/${selectedConversation._id}`,
          { withCredentials: true }
        );

        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return (
    <AdminChatWindow
      user={selectedConversation}
      messages={messages}
    />
  );
};

export default AdminChat;