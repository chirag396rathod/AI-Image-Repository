import React, { useState } from "react";
import { EllipsisOutlined, WechatOutlined } from "@ant-design/icons";

import { ChatBodyContainer } from "../styled";
import { Badge, Button, Empty } from "antd";
import Message from "./message";
import { LoaderContainer } from "../../../Components/Loader";
import moment from "moment";
import FormInput from "../../../Components/FormInput";
import { useFormik } from "formik";
import { Toast } from "../../../Components/Toater";
import { apiInstance } from "../../../Utils/axios";

const ChatBody = ({ data, loading }) => {
  const UserId = localStorage.getItem("user_id");
  const [massageLoading, setMassageLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      massage: "",
    },
    onSubmit: async (value, { resetForm }) => {
      const { massage } = value;
      try {
        setMassageLoading(true);
        const response = await apiInstance({
          method: "POST",
          url: `${import.meta.env.VITE_BASE__DEV_API_URL}/massages`,
          data: {
            conversationId: data?.conversation?.coonversationId,
            sender: UserId,
            text: massage,
          },
        });
        const { status } = response;

        if (status === 200) {
          formik.setFieldValue(["massage"], "");
          setMassageLoading(false);
        }
      } catch (error) {
        if (error) {
          setMassageLoading(false);
          Toast({
            type: "error",
            massage:
              error?.response?.data?.error?.message || "Somthing went wrong!",
          });
        }
      }
    },
  });
  return (
    <ChatBodyContainer>
      <header>
        <div className="left">
          <Badge dot status="success" className="badge" size="large">
            <div className="profile-image">
              <img src="https://picsum.photos/seed/picsum/200" alt="" />
            </div>
          </Badge>
          <div className="body">
            <div className="name">{data?.conversation?.name}</div>
            <div className="status">Online</div>
          </div>
        </div>
        <div className="right">
          <EllipsisOutlined className="ellips" />
        </div>
      </header>
      <div className="massage-container">
        {loading ? (
          <LoaderContainer />
        ) : (
          <>
            {data?.message?.length > 0 ? (
              <>
                {data?.message.map((item, key) => (
                  <Message
                    key={key}
                    role={item?.sender === UserId ? "sender" : "reciver"}
                    msg={item?.text}
                    time={moment(item?.updatedAt).format("LT")}
                  />
                ))}
              </>
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
      <div className="footer">
        <FormInput
          isRequired
          placeholder="type something..."
          name="massage"
          formik={formik}
          prefix={<WechatOutlined />}
        />
        <Button
          type={"primary"}
          onClick={formik.handleSubmit}
          loading={massageLoading}
        >
          Send Massage
        </Button>
      </div>
    </ChatBodyContainer>
  );
};

export default ChatBody;
