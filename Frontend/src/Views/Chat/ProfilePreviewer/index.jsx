import React from "react";
import { ProfilePreviewerContainer } from "../styled";
import {
  CloseOutlined,
  LeftOutlined,
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const ProfilePreviewer = () => {
  const navigator = useNavigate();
  return (
    <ProfilePreviewerContainer>
      <div className="header">
        <Button
          className="button-flex"
          icon={<LeftOutlined />}
          type="default"
          onClick={() => navigator(-1)}
        >
          Back
        </Button>
      </div>
      <div className="user-profile">
        <img src="https://picsum.photos/seed/picsum/200" alt="" />
      </div>
      <div className="option">
        <div className="item">
          <MessageOutlined />
          <div className="text">Message</div>
        </div>
        <div className="item">
          <PhoneOutlined />
          <div className="text">Call</div>
        </div>
        <div className="item">
          <VideoCameraOutlined />
          <div className="text">Video Call</div>
        </div>
      </div>
      <div className="bio">
        <div className="title">Note:</div>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo fuga
          ducimus architecto esse totam. Ut minus expedita quia perferendis esse
          dolore explicabo dolorem nam sequi?
        </div>
      </div>
    </ProfilePreviewerContainer>
  );
};

export default ProfilePreviewer;
