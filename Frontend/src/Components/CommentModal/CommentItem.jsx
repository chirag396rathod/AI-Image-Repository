import React from "react";
import { Avatar, Card } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { COLOR_LIST, USER_ID } from "../../Utils/constants";
import { FlexBox } from "../../globle-stled";
import { CommentItemStyle } from "./styled";

const CommentItem = ({ data, key }) => {
  const rendomFourDigit = Math.trunc(Math.abs(Math.random() * 4));

  return (
    <CommentItemStyle className="comment-item" key={key}>
      <Avatar
        style={{
          background: COLOR_LIST[rendomFourDigit],
          verticalAlign: "middle",
        }}
        size="large"
      >
        {data?.createdBy && data?.createdBy[0]?.name?.split("")[0]}
      </Avatar>
      <div className="comment-body">
        <div className="header">
          <FlexBox className="left">
            <div className="user-name">
              {data?.createdBy && data?.createdBy[0]?.name}
            </div>
            <span>{moment(data?.createdAt).fromNow()}</span>
          </FlexBox>
          {USER_ID === data?.user_id && (
            <div className="right">
              <EditOutlined className="icon" />
              <DeleteOutlined className="icon" />
            </div>
          )}
        </div>
        <div className="message">{data?.comment_title}</div>
      </div>
    </CommentItemStyle>
  );
};

export default CommentItem;
