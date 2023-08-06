import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

import { ChatBodyContainer } from "../styled";
import { Badge } from "antd";

const ChatBody = () => {
  return (
    <ChatBodyContainer>
      <header>
        <div className="left">
          <Badge dot status="success" className="badge" size="large">
            <div className="profile-image">
              <img src="https://picsum.photos/seed/picsum/200" alt="" />
            </div>
          </Badge>
          <div className="body">
            <div className="name">Chirag Rathod</div>
            <div className="status">Online</div>
          </div>
        </div>
        <div className="right">
          <EllipsisOutlined className="ellips" />
        </div>
      </header>
    </ChatBodyContainer>
  );
};

export default ChatBody;
