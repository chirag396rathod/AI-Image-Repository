import { styled } from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ isSender }) => (isSender ? "flex-end" : "flex-start")};
  margin-bottom: 20px;
  .massage-cover {
    max-width: 65%;
    display: inline-block;
    background-color: #0d6efd;
    color: #fff;
    max-width: auto;
    padding: 12px 12px 25px 12px;
    background-color: #0d6efd;
    border-radius: 0 12px 12px 0;
    position: relative;
    min-width: 15%;
  }
  .sender {
    border-radius: 12px 0px 0px 12px;
    width: fit-content;
    padding: 12px 12px 25px 12px;
    text-align: left;
  }
  .msg-info-container {
    font-size: 12px;
    font-weight: 400;
    font-family: Poppins;
    margin-top: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;

    right: 5px;
    bottom: 5px;
    span {
      margin-right: 10px;
    }
  }
  .is-reciver {
    justify-content: flex-start;
    left: 12px;
  }
`;
