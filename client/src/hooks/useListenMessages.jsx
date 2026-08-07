import { useEffect } from "react";
import useSocket from "./useSocket";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocket() || {};
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    // Handler when a real-time message event is emitted from the backend
    const handleNewMessage = (newMessage) => {
     
      setMessages([...messages, newMessage]);
    };

    // Listen for incoming message event (make sure string matches backend)
    socket.on("newMessage", handleNewMessage);

    // Clean up event listener on unmount or dependency update
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;