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
      </div>
      <span className="time">{time}</span>
    </MessageContainer>
  );
};

export default Message;
