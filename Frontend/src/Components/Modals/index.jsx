import React from "react";
import { Modal } from "antd";

const Modals = ({ title, isOpen, toggle, footer, children }) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={toggle}
      centered
      onCancel={toggle}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default Modals;
