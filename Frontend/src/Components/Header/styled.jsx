import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  padding: 15px 20px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-input {
    max-width: 840px;
    input {
      font-family: "Poppins", sans-serif !important;
    }
    width: 100%;
  }
  .header-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .logo-cover {
      max-width: 42px;
      max-height: 42px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }
  }
  .right-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ProfileContentStyled = styled.div`
  min-width: 200px;
  .user-name {
    font: 600 20px "Poppins";
    color: #000;
    margin-bottom: 10px;
  }
  .list {
    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      border-radius: 6px;
      margin-top: 10px;
      padding: 5px 0;
      border-bottom: 1px solid transparent;
      &:nth-child(1) {
        margin-top: 0px;
      }
      span {
        font: 600 16px "Poppins";
        color: rgba(0, 0, 0, 0.28);
        margin-left: 10px;
      }

      &:hover {
        color: #fff;
        border-bottom: 1px solid #1677ff;
      }
    }
  }
`;
