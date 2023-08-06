import React from "react";
import { ChatContainer } from "./styled";
import Sidebar from "./Sidebar";
import ChatBody from "./ChatBody";
import ProfilePreviewer from "./ProfilePreviewer";

const Chat = () => {
  return (
    <ChatContainer>
      <Sidebar />
      <ChatBody />
      <ProfilePreviewer />
    </ChatContainer>
  );
};

export default Chat;
