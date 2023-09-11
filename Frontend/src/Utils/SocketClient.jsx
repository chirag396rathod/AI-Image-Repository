import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { USER_ID } from "./constants";
import { useDispatch } from "react-redux";
import {
  handleSetActiveUser,
  handleSetSocket,
  handleStoreMessaged,
} from "../Redux";

const SocketClient = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketConnection = io(
      import.meta.env.VITE_BASE_API_URL || "http://localhost:8080"
    );
    setSocket(socketConnection);
    dispatch(handleSetSocket(socketConnection));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", USER_ID);
    socket?.on("getUser", (users) => {
      if (users) {
        dispatch(handleSetActiveUser(users));
      }
    });

    socket?.on("getMassage", (newMassage) => {
      console.log(newMassage);
      dispatch(handleStoreMessaged(newMassage));
    });
  }, [socket]);

  return <></>;
};

export default SocketClient;
