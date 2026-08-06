import { useEffect } from "react";
import axios from "axios";

import useConversation from "../../../zustand/useConversation";
import UsersChatWindow from "./UsersChatWindow";

const UsersChat = () => {
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
    <UsersChatWindow
      owner={selectedConversation}
      messages={messages}
    />
  );
};

export default UsersChat;