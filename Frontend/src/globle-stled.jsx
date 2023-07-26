import { styled } from "styled-components";

export const ImageGridContainer = styled.div`
  width: 100%;
  min-width: 100%;
  display: column;
  align-items: start;
  columns: 4;
  gap: 20px;
  transition: ease-in 0.1s;

  @media screen and (max-width: 1080px) {
    columns: 3;
  }
  @media screen and (max-width: 720px) {
    columns: 2;
  }
  @media screen and (max-width: 460px) {
    columns: 1;
  }
  & > * {
    margin-bottom: 20px;
    break-inside: auto;
  }
`;

export const AuthContainer = styled.div`
  .row {
    margin: 0 !important;
  }
  .col-8,
  .col-4 {
    padding: 0 !important;
  }
  .main-content {
    max-height: 100vh;
    background: rgba(135, 206, 235, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-form-item-control {
      width: 100%;
    }
    .logo-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 40px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        font: 500 20px Poppins;
        color: #000;
        margin-left: 10px;
      }
    }
    .label-desc {
      .signin-title {
        font: 500 16px Poppins;
        color: #000;
        margin-bottom: 10px;
      }
      .sub-info-title {
        font: 400 13px Poppins;
        color: #8c8c8c;
        margin-bottom: 20px;
      }
    }
  }
  .sidebar {
    background: linear-gradient(to top right, #87ceeb, #ffffff);
    min-height: 100vh;
    padding: 50px 0px 0px 90px !important;
    .info-text {
      font: 600 32px Poppins;
      color: #fff;
      margin-top: 50px;
    }
    .info-image {
      max-width: 80%;
      margin: 30px 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
  }
  .benefits-section {
    .benefit-title {
      font: 500 20px Poppins;
      color: #fff;
      margin-bottom: 12px;
    }
    .benefit-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 6px;
      span {
        color: #fff;
      }
      .text {
        margin-left: 10px;
        font: 400 16px Poppins;
      }
    }
  }
  .account-info-link {
    font: 400 12px Poppins;
    text-align: center;
    color: #8c8c8c;
    margin-top: 20px;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
