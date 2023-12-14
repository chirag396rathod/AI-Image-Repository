import React from "react";
import { Popover, Avatar, Button, Tooltip } from "antd";
import {
  UserOutlined,
  CompressOutlined,
  LogoutOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import { Logo } from "../../assets/Images";
import { HeaderContainer, ProfileContentStyled } from "./styled";
import { Link } from "react-router-dom";
import {
  ROUTE_CHAT,
  ROUTE_CREATE_POST_PAGE,
  ROUTE_HOME_PAGE,
  ROUTE_SIGN_IN,
} from "../../routes/routes";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = ROUTE_SIGN_IN;
  };

  const content = (
    <ProfileContentStyled>
      <div className="user-name">Chirag Rathod</div>
      <div className="list">
        <div className="item">
          <UserOutlined size={20} />
          <span>Profile</span>
        </div>
        <Link to={ROUTE_CHAT} className="item">
          <CommentOutlined size={20} />
          <span>Chat</span>
        </Link>
        <div className="logout item">
          <LogoutOutlined size={20} />
          <span>Logout</span>
        </div>
      </div>
    </ProfileContentStyled>
  );

  return (
    <HeaderContainer>
      <Link to={ROUTE_HOME_PAGE} className="header-right">
        <div className="logo-cover">
          <img src={Logo} alt="logo" />
        </div>
        <div className="title">AI Image Repository</div>
      </Link>

      <div className="right-section">
        <Tooltip placement="bottom" title="Generate image" color={"black"}>
          <Link to={ROUTE_CREATE_POST_PAGE.replace(":page", 1)}>
            <Button icon={<CompressOutlined />} className="button-flex">
              Generate
            </Button>
          </Link>
        </Tooltip>
        <Popover className="mx-3" placement="bottomRight" content={content}>
          <Avatar
            size={40}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Popover>

        {/* <LogoutOutlined
          style={{ fontSize: "20px", marginLeft: "20px", cursor: "pointer" }}
          onClick={() => handleLogout()}
        /> */}
      </div>
    </HeaderContainer>
  );
};

export default Header;
