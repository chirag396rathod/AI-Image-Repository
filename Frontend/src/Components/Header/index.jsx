import React from "react";
import { Input, Button, Tooltip } from "antd";
import {
  WechatOutlined,
  CompressOutlined,
  LogoutOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import { Logo } from "../../assets/Images";
import { HeaderContainer } from "./styled";
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
  return (
    <HeaderContainer>
      <Link to={ROUTE_HOME_PAGE} className="header-right">
        <div className="logo-cover">
          <img src={Logo} alt="logo" />
        </div>
        <div className="title">AI Image Repository</div>
      </Link>

      <div className="right-section">
        <Link to={ROUTE_CHAT}>
          <Tooltip placement="bottom" title="Chat" color={"black"}>
            <CommentOutlined
              style={{
                fontSize: "20px",
                marginRight: "20px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Link>
        <Tooltip placement="bottom" title="Generate image" color={"black"}>
          <Link to={ROUTE_CREATE_POST_PAGE.replace(":page", 1)}>
            <Button icon={<CompressOutlined />} className="button-flex">
              Generate
            </Button>
          </Link>
        </Tooltip>
        <LogoutOutlined
          style={{ fontSize: "20px", marginLeft: "20px", cursor: "pointer" }}
          onClick={() => handleLogout()}
        />
      </div>
    </HeaderContainer>
  );
};

export default Header;
