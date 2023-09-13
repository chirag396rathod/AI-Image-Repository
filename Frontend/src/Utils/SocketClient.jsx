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
    const socketConnection = io(import.meta.env.VITE_BASE_API_URL);
    setSocket(socketConnection);
    dispatch(handleSetSocket(socketConnection));
    if (socketConnection.isConnected) {
      console.log("Socket is connected!");
    } else {
      console.log("Socket is not connected!");
    }
  }, []);

  useEffect(() => {
    if (socket.isConnected) {
      console.log("Socket is connected!");
    } else {
      console.log("Socket is not connected!");
    }
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
