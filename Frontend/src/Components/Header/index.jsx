import React from "react";
import { Input, Button, Tooltip } from "antd";
import { CompressOutlined, LogoutOutlined } from "@ant-design/icons";

import { Logo } from "../../assets/Images";
import { HeaderContainer } from "./Styled";
import { Link } from "react-router-dom";
import {
  ROUTE_CREATE_POST_PAGE,
  ROUTE_HOME_PAGE,
  ROUTE_SIGN_IN,
} from "../../routes/routes";

const { Search } = Input;

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

      <Search
        allowClear
        placeholder="Search..."
        className="search-input"
        onSearch={() => []}
      />
      <div className="right-section">
        <Tooltip placement="bottom" title="Generate image" color={"black"}>
          <Link to={ROUTE_CREATE_POST_PAGE}>
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
