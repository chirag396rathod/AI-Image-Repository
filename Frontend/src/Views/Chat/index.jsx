import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChatContainer } from "./styled";
import { Toast } from "../../Components/Toater";
import { apiInstance } from "../../Utils/axios";
import { handleStoreMessaged } from "../../Redux";
import Sidebar from "./Sidebar";
import ChatBody from "./ChatBody";
import ProfilePreviewer from "./ProfilePreviewer";
import SocketClient from "../../Utils/SocketClient";

const Chat = () => {
  const [chatMassages, setChatMassages] = useState({
    massages: [],
  });
  const [loading, setLoading] = useState(false);
  const [conversation, setconversation] = useState(null);
  const dispatch = useDispatch();
  const messageData = useSelector((state) => state.chatapp.messages);

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
        });
        dispatch(handleStoreMessaged(data?.data));
        setconversation(coonversation);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
        conversation={conversation}
      />
      <ChatBody
        data={messageData}
        conversation={conversation}
        loading={loading}
      />
      <ProfilePreviewer />
      <SocketClient />
    </ChatContainer>
  );
};

export default Chat;
