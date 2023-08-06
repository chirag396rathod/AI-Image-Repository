import { styled } from "styled-components";

export const ListContainer = styled.div`
  padding: 10px;
  border: 1px solid rgba(5, 5, 5, 0.1);
  max-height: 390px;
  overflow: scroll;
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    padding: 10px;
    border: 1px solid rgba(5, 5, 5, 0.1);
    border-radius: 10px;
    margin-top: 10px;
    span {
      font: 600 14px Poppins;
    }
    &:nth-child(1) {
      margin-top: 0px;
    }
  }
`;
