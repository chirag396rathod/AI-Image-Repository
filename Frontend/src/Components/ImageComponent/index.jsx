import React from "react";
import { Badge } from "antd";
import { styled } from "styled-components";

const ImageComponentContainer = styled.div`
  &.flow > img {
    transition: ease-in 0.1s;
    object-fit: cover;
    width: 100%;
    max-height: 100%;
    border-radius: 6px;
    box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.1);
    filter: blur(1);
    position: relative;
  }
  &.flow {
    position: relative;
  }
  .label {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    .title {
      color: #fff;
      font: 400 14px Poppins;
    }
  }
`;

const ImageComponent = ({ data, key }) => {
  return (
    <Badge.Ribbon text="Economy" key={key}>
      <ImageComponentContainer className="content flow">
        <img src={data.image} alt="data" />
        <div className="label">
          <span className="title">This is prompt title</span>
        </div>
      </ImageComponentContainer>
    </Badge.Ribbon>
  );
};

export default ImageComponent;
