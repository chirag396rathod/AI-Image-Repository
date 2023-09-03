import React, { useEffect, useState } from "react";
import { ChatContainer } from "./styled";
import Sidebar from "./Sidebar";
import ChatBody from "./ChatBody";
import ProfilePreviewer from "./ProfilePreviewer";
import { Toast } from "../../Components/Toater";
import { apiInstance } from "../../Utils/axios";
import SocketClient from "../../Utils/SocketClient";
// import { connect_socket } from "../../Utils/socket";

const Chat = () => {
  const [chatMassages, setChatMassages] = useState({
    massages: [],
    conversation: null,
  });
  const [loading, setLoading] = useState(false);

  const handleGetChatMssages = async (coonversation) => {
    try {
      setLoading(true);
      const response = await apiInstance({
        method: "POST",
        url: `${import.meta.env.VITE_BASE_API_URL}/massages/get`,
        data: {
          conversationId: coonversation?.coonversationId,
        },
      });
      const { data, status } = response;
      if (status === 200) {
        setChatMassages({
          message: data?.data,
          conversation: coonversation,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Toast({
        type: "error",
        massage:
          error?.response?.data?.error?.message || "Somthing went wrong!",
      });
    }
  };
  return (
    <ChatContainer>
      <Sidebar
        handleGetChatMssages={handleGetChatMssages}
        conversation={chatMassages?.conversation}
      />
      <ChatBody data={chatMassages} loading={loading} />
      <ProfilePreviewer />
      <SocketClient />
    </ChatContainer>
  );
};

export default Chat;
