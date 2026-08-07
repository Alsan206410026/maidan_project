import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Retrieve auth user from localStorage (adjust key if different)
  const authUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (authUser && (authUser._id || authUser.id)) {
      const userId = authUser._id || authUser.id;

      const newSocket = io("http://localhost:5001", {
        withCredentials: true,
        query: {
          userId: userId,
        },
      });

      setSocket(newSocket);

      // Listen for online users list broadcast from backend
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.off("getOnlineUsers");
        newSocket.disconnect();
        setSocket(null);
      };
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [authUser?._id || authUser?.id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;