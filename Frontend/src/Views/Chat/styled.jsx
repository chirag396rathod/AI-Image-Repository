import { styled } from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SidebarContainer = styled.div`
  padding: 10px 20px;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
  height: calc(100vh - 85px);
  max-width: 400px;
  min-width: 400px;
  .title {
    font: 600 24px Poppins;
    margin-bottom: 10px;
  }
  .contect-list {
    max-height: calc(100vh - 24vh);
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .active {
      border-top: 1px solid #fff !important;
      background-color: #0d6efd;
      border-radius: 10px;
      &:hover {
        background-color: #0d6efd;
      }
      .contect-name {
        color: #fff;
      }
      .contect-msg {
        .text {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        .time {
          color: #fff !important;
        }
      }
    }
  }
  .contect-item {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    cursor: pointer;
    &:hover {
      background-color: rgba(5, 5, 5, 0.03);
    }
    &:nth-child(1) {
      border-top: none;
    }
    .contect-profile {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .contect-body {
      margin-left: 10px;
      flex: 1;
      .contect-name {
        font: 500 16px Poppins;
      }
      .contect-msg {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .text {
          font: 400 14px Poppins;
          color: rgba(5, 5, 5, 0.5);
          min-width: 73%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .time {
          margin-left: 10px;
          font: 400 14px Poppins;
          color: rgba(5, 5, 5, 0.4);
        }
      }
    }
  }
`;

export const ChatBodyContainer = styled.div`
  flex: 1;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    .anticon-ellipsis {
      svg {
        font-size: 25px;
      }
      transform: rotate(90deg);
      cursor: pointer;
    }
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .ant-badge-dot {
        width: 10px;
        height: 10px;
        top: 10px;
        right: 15px;
      }
      .profile-image {
        width: 45px;
        height: 45px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .body {
        .name {
          font: 500 14px Poppins;
          color: #000;
        }
        .status {
          font: 500 12px Poppins;
          color: #5ad539;
        }
      }
    }
  }
  .chat-massage-body {
  }
`;

export const ProfilePreviewerContainer = styled.div`
  min-width: 400px;
  max-width: 400px;
  height: calc(100vh - 85px);
  border-left: 1px solid rgba(5, 5, 5, 0.06);

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    svg {
      cursor: pointer;
    }
  }
  .user-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    padding: 20px 50px;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      svg {
        font-size: 30px;
        color: rgba(13, 110, 253, 0.3);
      }
      .text {
        font: 400 12px Poppins;
        border: 1px solid #0d6efd;
        padding: 3px 12px;
        border-radius: 20px;
        margin-top: 12px;
        color: #0d6efd;
      }
      &:hover {
        svg {
          color: #0d6efd;
        }
        .text {
          background: #0d6efd;
          color: #fff;
        }
      }
    }
  }
  .bio {
    padding: 20px;
    .title {
      font: 600 18px Poppins;
      margin-bottom: 10px;
    }
    .desc {
      font: 400 14px Poppins;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
