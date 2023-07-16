import { message } from "antd";

export const Toast = ({ type, massage }) => {
  message[type || "success"](massage || "This is a normal message");
};
