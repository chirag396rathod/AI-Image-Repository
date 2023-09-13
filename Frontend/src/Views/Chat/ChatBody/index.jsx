import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { EllipsisOutlined, WechatOutlined } from "@ant-design/icons";
import { Input, Badge, Button, Empty } from "antd";
import moment from "moment";
import * as Yup from "yup";

import { Toast } from "../../../Components/Toater";
import { ChatBodyContainer } from "../styled";
import { LoaderContainer } from "../../../Components/Loader";
import { apiInstance } from "../../../Utils/axios";
import Message from "./Message";
import { useSelector } from "react-redux";

const ChatBody = ({ data, conversation, loading }) => {
  const UserId = localStorage.getItem("user_id");
  const messageEl = useRef(null);
  const [massageLoading, setMassageLoading] = useState(false);
  const { TextArea } = Input;
  const socket = useSelector((state) => state.chatapp.socket);

  const MassageShema = Yup.object().shape({
    massage: Yup.string().required("Massage is required!"),
  });

  const formik = useFormik({
    initialValues: {
      massage: "",
    },
    validationSchema: MassageShema,
    onSubmit: async (value, { resetForm }) => {
      const { massage } = value;
      if (socket) {
        socket?.emit("sendMassage", {
          conversationId: conversation?.coonversationId,
          sender: UserId,
          text: massage,
          reciver: conversation?.reciverId,
        });
      }
      try {
        setMassageLoading(true);
        const response = await apiInstance({
          method: "POST",
          url: `${import.meta.env.VITE_BASE_API_URL}/massages`,
          data: {
            conversationId: conversation?.coonversationId,
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

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [data]);

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
            <div className="name">{conversation?.name}</div>
            <div className="status">Online</div>
          </div>
        </div>
        <div className="right">
          <EllipsisOutlined className="ellips" />
        </div>
      </header>
      <div className="massage-container" ref={messageEl}>
        {loading ? (
          <LoaderContainer />
        ) : (
          <>
            {data?.length > 0 ? (
              <>
                {data?.map((item, key) => (
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
        <form onSubmit={formik.handleSubmit}>
          <TextArea
            placeholder="Type something..."
            allowClear
            rows={1}
            name="massage"
            onBlur={() => formik && formik.setFieldTouched(["massage"])}
            value={formik.values.massage}
            onChange={formik.handleChange}
            prefix={<WechatOutlined />}
          />
          <Button type={"primary"} htmlType="submit" loading={massageLoading}>
            Send Massage
          </Button>
        </form>
      </div>
    </ChatBodyContainer>
  );
};

export default ChatBody;
