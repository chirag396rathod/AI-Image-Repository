import React from "react";
import { CheckOutlined } from "@ant-design/icons";

import { MessageContainer } from "./styled";

const Message = ({ role, msg, time }) => {
  return (
    <MessageContainer isSender={role === "sender"}>
      <div
        className={
          role === "sender" ? "sender massage-cover" : "massage-cover reciver"
        }
      >
        {msg}

        <div
          className={
            role === "sender"
              ? "is-sender msg-info-container"
              : "msg-info-container is-reciver"
          }
        >
          <span>{time}</span>
        </div>
      </div>
    </MessageContainer>
  );
};

export default Message;
