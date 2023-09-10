import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import cx from "classnames";

import { SidebarContainer } from "../styled";
import FormInput from "../../../Components/FormInput";
import { LoaderContainer } from "../../../Components/Loader";
import { apiInstance } from "../../../Utils/axios";
import { Toast } from "../../../Components/Toater";
import { Empty } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const Sidebar = ({ handleGetChatMssages, conversation }) => {
  const activeUsers = useSelector((state) => state.chatapp.activeUsers);

  const [contects, setContect] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContectList = async () => {
    setLoading(true);
    try {
      const response = await apiInstance({
        method: "GET",
        url: `${import.meta.env.VITE_BASE_API_URL}/conversation`,
      });
      const { status, data } = response;
      if (status === 200) {
        setContect(data?.data);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        setLoading(false);

        Toast({
          type: "error",
          massage:
            error?.response?.data?.error?.message || "Somthing went wrong!",
        });
      }
    }
  };

  useEffect(() => {
    getContectList();
  }, []);

  return (
    <SidebarContainer
      className={(contects.length === 0 || loading) && "set-list-center"}
    >
      <div className="title">Chats</div>
      <FormInput placeholder={"Search Messenger"} prefix={<SearchOutlined />} />
      <div className="contect-list">
        {loading ? (
          <LoaderContainer />
        ) : (
          <>
            {contects.length !== 0 ? (
              <>
                {contects?.map((item, key) => (
                  <div
                    className={`contect-item ${
                      item?.coonversationId === conversation?.coonversationId
                        ? "active"
                        : ""
                    }`}
                    key={key}
                    onClick={() => handleGetChatMssages(item)}
                  >
                    <div className="contect-profile">
                      <img
                        src="https://picsum.photos/seed/picsum/200/300"
                        alt="data"
                      />
                    </div>
                    <div className="contect-body">
                      <div className="contect-name">{item.name}</div>
                      <div className="contect-msg">
                        <div className="text">
                          {item?.coonversationId ===
                          conversation?.coonversationId
                            ? "Online"
                            : "Offline"}
                        </div>
                        {/* <div className="time">
                          {moment(item?.updatedAt).fromNow()}
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
