import { styled } from "styled-components";
import { Spin } from "antd";

const ImageContainer = styled.div`
  width: 100%;
  min-height: 40px;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  filter: blur(10px);
  transition: filter 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainerStyled = styled.div`
  width: 100%;
  height: ${({ height }) => height || "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoaderImageContainer = () => (
  <ImageContainer>
    <Spin />
  </ImageContainer>
);
export const LoaderContainer = ({ height }) => (
  <LoaderContainerStyled height={height || 0}>
    <Spin />
  </LoaderContainerStyled>
);
