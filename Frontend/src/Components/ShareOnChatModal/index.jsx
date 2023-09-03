import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";

import Modals from "../Modals";
import { ListContainer } from "./styled";
import { apiInstance } from "../../Utils/axios";
import { Toast } from "../Toater";
import { LoaderContainer } from "../Loader";
import { USER_ID } from "../../Utils/constants";

const ShareOnChatModal = (props) => {
  const { isOpen, toggle, footer } = props;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await apiInstance({
        method: "get",
        url: `${import.meta.env.VITE_BASE__DEV_API_URL}/conversation/users`,
      });
      const { data, status } = response;
      if (status === 200) {
        if (data) {
          setUsers(data.data);
          setLoading(false);
        }
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
    getAllUsers();
  }, []);

  const handleAddFriend = async (reciverId) => {
    try {
      setLoading(true);
      const response = await apiInstance({
        method: "POST",
        url: `${import.meta.env.VITE_BASE__DEV_API_URL}/conversation`,
        data: {
          senderId: USER_ID,
          reciverId,
        },
      });
      const { status } = response;
      if (status === 200) {
        getAllUsers();
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

  return (
    <Modals
      isOpen={isOpen}
      toggle={toggle}
      title={"Share Image with your friends!"}
      footer={footer}
    >
      <ListContainer className="user-profile-list">
        {loading ? (
          <LoaderContainer />
        ) : (
          <>
            {users.length > 0 ? (
              <>
                {users.map((item, key) => (
                  <div className="item" key={key}>
                    <Button
                      size="small"
                      style={{
                        width: "110px",
                      }}
                      type={item?.isFriend ? "primary" : "dashed"}
                      onClick={() =>
                        item?.isFriend ? () => {} : handleAddFriend(item?._id)
                      }
                    >
                      {item?.isFriend ? "Share Now" : "Add"}
                    </Button>
                    <span className="mx-2">{item?.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <Empty />
            )}
          </>
        )}
      </ListContainer>
    </Modals>
  );
};

export default ShareOnChatModal;
