import { styled } from "styled-components";

export const CreateImageContainer = styled.div`
  min-height: calc(100vh - 79px);
  height: 100%;

  .row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .col,
  .col-9,
  .col-3 {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  &.container-fluid {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
`;

export const SidebarContainer = styled.div`
  border-left: 1px solid rgba(5, 5, 5, 0.06);
  height: 100%;
  min-height: calc(100vh - 79px);
  width: 100%;
  position: relative;
  .ant-divider-with-text {
    margin: 0 !important;
  }
  .title {
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    padding: 20px;
    font: 600 18px "Poppins";
    color: #000;
  }
  .description-container {
    padding: 20px;
    label {
      font: 400 14px "Poppins";
      color: #000;
      margin-bottom: 10px;
    }
  }
  .select-style-container {
    padding: 20px 20px 0 20px;
    label {
      font: 400 14px "Poppins";
      color: #000;
      margin-bottom: 10px;
    }
    .style-row {
      max-height: 380px;
      height: 100%;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 0px;
      }
    }
    .row {
      margin-left: -5px !important;
      margin-right: -5px !important;
    }
    .col-4 {
      padding-left: 5px !important;
      padding-right: 5px !important;
    }
    .style-cover {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }
      margin-bottom: 10px;
    }
  }
  .upload-image {
    padding: 20px;
    margin-bottom: 60px;
    .info-text {
      font: 400 14px "Poppins";
      color: #000;
      margin-bottom: 10px;
      text-align: center;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .image-satting-content {
    max-height: calc(100vh - 141px);
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  .upload-button {
    padding: 20px;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
`;

export const ImagePriviwerContainer = styled.div`
  padding: 20px 20px 0 20px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    color: #8c8c8c;
    font-size: 15px;
  }
  .container-border {
    max-height: calc(100vh - 188px);
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  .placeholder-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 300px);
    height: 100%;
    .image-cover {
      max-width: 550px;
      max-height: 550px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      color: #8c8c8c;
      font-size: 15px;
    }
  }
`;
