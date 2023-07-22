import React, { useState } from "react";
import { Badge, Image, Button, Avatar } from "antd";
import { styled } from "styled-components";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { LoaderImageContainer } from "../Loader";
import { COLOR_LIST, USER_ID } from "../../Utils/constants";
import { Toast } from "../Toater";
import axios from "axios";

const ImageComponentContainer = styled.div`
  &:hover {
    .header {
      visibility: visible !important;
    }
  }
  .ant-image-mask {
    border-radius: 6px;
  }
  .ant-image-img {
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
  &:hover {
    .label {
      bottom: 0px !important;
      display: inline !important ;
    }
  }
  .label {
    position: absolute;
    background: #1a1110;
    padding: 10px;
    bottom: -150px;
    display: none;
    left: 0px;
    margin: 10px;
    border-radius: 6px;
    border-radius: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 1;
    white-space: wrap;

    .title {
      color: #fff;
      font: 400 14px Poppins;
    }
  }
`;

const HeaderButtons = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
  visibility: hidden;
`;
const FooterList = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-data {
      font: 400 14px Poppins;
      color: #fff;
      margin-left: 10px;
    }
  }
  a {
    color: #fff !important;
    font-size: 18px;
  }
`;

const ImageComponent = ({ data, key, isFrom }) => {
  const rendomFourDigit = Math.trunc(Math.abs(Math.random() * 4));
  const [isLoading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleShare = async (data) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_API_URL}/share-image`,
        data: {
          prompt: data?.prompt,
          src: data?.src,
          user_id: USER_ID,
        },
      });
      if (response?.status === 200) {
        setLoading(false);
        Toast({
          type: "success",
          massage: "Image Shared Successfully with Community!",
        });
      }
    } catch (error) {
      if (error) {
        setLoading(false);

        Toast({
          type: "error",
          massage:
            error?.response?.data?.error?.message || "Somthing went wrong!",
        });
      }
    }
  };

  return (
    <>
      <Badge.Ribbon
        text="Selected"
        style={{
          display: "none",
        }}
        key={key}
      >
        <ImageComponentContainer className="content flow">
          <HeaderButtons className={"header"}>
            <Button
              type="dashed"
              icon={<EyeOutlined />}
              className={isFrom && isFrom === "generate-image" && "mx-2"}
              onClick={handlePreview}
            >
              Preview
            </Button>
            {isFrom && isFrom === "generate-image" && (
              <Button
                type="primary"
                onClick={() => handleShare(data)}
                loading={isLoading}
              >
                Share
              </Button>
            )}
          </HeaderButtons>
          <Image
            width={"100%"}
            className="content flow"
            src={data.src}
            placeholder={<LoaderImageContainer />}
            preview={{
              visible: showPreview,
              mask: false,
              onVisibleChange: () => {
                handlePreview();
              },
            }}
          />
          {isFrom === "dashboard" && (
            <div className="label">
              <span className="title">
                {data.prompt.substring(0, 50) + "..."}
              </span>
              <FooterList>
                <div className="left">
                  <Avatar
                    style={{
                      background: COLOR_LIST[rendomFourDigit],
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {data?.createdBy[0]?.name?.split("")[0]}
                  </Avatar>
                  <div className="user-data">{data?.createdBy[0]?.name}</div>
                </div>
                <a href={data.src} download target="_blank">
                  <DownloadOutlined className="download" />
                </a>
              </FooterList>
            </div>
          )}
        </ImageComponentContainer>
      </Badge.Ribbon>
    </>
  );
};

export default ImageComponent;
