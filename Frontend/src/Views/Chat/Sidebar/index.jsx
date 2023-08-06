import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import cx from "classnames";

import { SidebarContainer } from "../styled";
import FormInput from "../../../Components/FormInput";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="title">Chats</div>
      <FormInput placeholder={"Search Messenger"} prefix={<SearchOutlined />} />
      <div className="contect-list">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1].map((item, key) => (
          <div
            className={`contect-item ${key === 2 ? "active" : ""}`}
            key={key}
          >
            <div className="contect-profile">
              <img src="https://picsum.photos/seed/picsum/200/300" alt="data" />
            </div>
            <div className="contect-body">
              <div className="contect-name">Chirag Rathod</div>
              <div className="contect-msg">
                <div className="text">This is massage</div>
                <div className="time">1min ago</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
