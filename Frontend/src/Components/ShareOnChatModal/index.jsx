import React from "react";
import { Button, Checkbox } from "antd";

import Modals from "../Modals";
import { ListContainer } from "./styled";

const ShareOnChatModal = (props) => {
  const { isOpen, toggle, footer } = props;
  return (
    <Modals
      isOpen={isOpen}
      toggle={toggle}
      title={"Share Image with your friends!"}
      footer={footer}
    >
      <ListContainer className="user-profile-list">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, key) => (
          <div className="item" key={key}>
            <Checkbox checked={false} />
            <span className="mx-2">Chirag Rathod</span>
          </div>
        ))}
      </ListContainer>
      <Button
        size="large"
        style={{
          marginTop: "10px",
          width: "100%",
        }}
        type="primary"
      >
        Share
      </Button>
    </Modals>
  );
};

export default ShareOnChatModal;
