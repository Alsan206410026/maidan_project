import { useEffect } from "react";
import axios from "axios";

import useConversation from "../../../zustand/useConversation";
import useListenMessages from "../../../hooks/useListenMessages";
import UsersChatWindow from "./UsersChatWindow";

const UsersChat = () => {
  const { selectedConversation, messages, setMessages } = useConversation();

  // Real-time socket listener
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
    <UsersChatWindow
      owner={selectedConversation}
      messages={messages}
    />
  );
};

export default UsersChat;