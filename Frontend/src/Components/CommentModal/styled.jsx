import { styled } from "styled-components";

export const CommentModalContainer = styled.div`
  .ant-card-body {
    padding: 10px !important;
  }
  .ant-empty-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(525px - 130px);
  }
  .comment-container {
    position: relative;
    min-height: 450px;

    .comment-msg-body {
      min-height: 400px;
      max-height: 400px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0px !important;
      }
    }
    .comment-item {
      margin-top: 12px;
      &:nth-child(1) {
        margin-top: 0px;
      }
    }
  }
`;

export const CommentItemStyle = styled.div`
  .ant-avatar {
    min-width: 40px;
    min-height: 40px;
  }
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .comment-body {
    margin-left: 10px;
    flex: 1;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .left {
        flex: 1;
        .user-name {
          font: 600 14px Poppins;
          color: #000;
        }
        span {
          font: 400 12px Poppins;
          color: #8c8c8c;
          margin-left: 10px;
        }
      }
      .right {
        .icon {
          color: #8c8c8c;
          font-size: 16px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .message {
      font: 500 12px Poppins;
      color: rgba(0, 0, 0, 0.5);
      margin-top: 5px;
      white-space: wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const CommentInputboxStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  .ant-form-item {
    margin-bottom: 0px !important;
    width: 100%;
  }
  .ant-btn {
    margin-left: 10px;
  }
`;
