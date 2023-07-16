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
