import { styled } from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ isSender }) => (isSender ? "flex-end" : "flex-start")};
  flex-direction: column;
  align-items: ${({ isSender }) => (isSender ? "flex-end" : "baseline")};
  margin-bottom: 20px;
  .massage-cover {
    max-width: 65%;
    display: inline-block;
    background-color: #0d6efd;
    color: #fff;
    max-width: auto;
    padding: 12px 18px;
    background-color: #0d6efd;
    border-radius: 30px;
    position: relative;
  }
  .time {
    font-size: 12px;
    font-weight: 400;
    font-family: Poppins;
    padding-left: ${({ isSender }) => !isSender && "10px"};
    padding-right: ${({ isSender }) => isSender && "10px"};
    padding-top: 5px;
  }
  .sender {
    border-radius: 30px;
    width: fit-content;
    padding: 12px 18px;
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

    /* position: absolute;
    right: 5px;
    bottom: 5px; */
    span {
      margin-right: 10px;
    }
  }
  .is-reciver {
    justify-content: flex-start;
    left: 12px;
  }
`;
