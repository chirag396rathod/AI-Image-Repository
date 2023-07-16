import React from "react";
import { Pagination } from "antd";
import { styled } from "styled-components";

const PaginationComponentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const PaginationComponent = ({ curruntIndex, total }) => {
  return (
    <PaginationComponentContainer>
      <Pagination defaultCurrent={curruntIndex || 1} total={total || 50} />
    </PaginationComponentContainer>
  );
};

export default PaginationComponent;
