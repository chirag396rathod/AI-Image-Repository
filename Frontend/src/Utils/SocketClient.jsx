import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { USER_ID } from "./constants";

const SocketClient = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketConnection = io("http://localhost:8080");
    setSocket(socketConnection);
  }, []);

  useEffect(() => {
    socket?.emit("addUser", USER_ID);
    socket?.on("getUser", (users) => {
      console.log({ users });
    });
    console.log("Call...");
  }, [socket]);

  return <></>;
};

export default SocketClient;
