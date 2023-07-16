import { styled } from "styled-components";

export const DashboardContainer = styled.div``;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right-side {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-index {
    color: #8c8c8c;
    font-size: 14px;
  }
`;

export const DashboardMain = styled.main`
  .dashboard-heading {
    color: #8c8c8c;
    font-size: 14px;
    margin: 35px 0px 20px 0;
  }
  width: 100%;
  margin-bottom: 35px;
  min-width: 100%;
`;
