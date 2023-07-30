import React, { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { CommentInputboxStyled } from "./styled";
import FormInput from "../FormInput";
import { Toast } from "../Toater";
import { apiInstance } from "../../Utils/axios";

const CommentInputbox = ({
  handlePostComment,
  isCommentLoading,
  input,
  setInput,
}) => {
  const handleOnInputChange = ({ target }) => {
    const value = target && target?.value;
    setInput(value || "");
  };

  return (
    <CommentInputboxStyled>
      <Input
        size="middle"
        value={input}
        onChange={handleOnInputChange}
        placeholder="Send Message"
      />
      <Button
        size="middle"
        type="primary"
        icon={<SendOutlined />}
        loading={isCommentLoading}
        disabled={isCommentLoading}
        onClick={() => handlePostComment({ input })}
      >
        Send
      </Button>
    </CommentInputboxStyled>
  );
};

export default CommentInputbox;
