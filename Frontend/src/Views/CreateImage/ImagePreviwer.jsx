import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ImagePriviwerContainer } from "./styled";
import { ImageGridContainer } from "../../globle-stled";
import ImageComponent from "../../Components/ImageComponent";
import { data } from "../Dashboard/data";
import { CreatePostPlaceholderIcon } from "../../assets/Images";
import PaginationComponent from "../../Components/PaginationComponent";

const ImagePreviwer = () => {
  const [hasList, setHasList] = useState(true);
  const navigator = useNavigate();
  return (
    <ImagePriviwerContainer>
      <Button
        className="button-flex"
        icon={<LeftOutlined />}
        type="default"
        onClick={() => navigator(-1)}
      >
        Back
      </Button>

      {hasList ? (
        <>
          <header>
            <div className="info-text">Results for "Tranding images"</div>
            <div className="page-text">1-10 of 50</div>
          </header>
          <div className="container-border">
            <ImageGridContainer>
              {data.map((item, key) => (
                <ImageComponent data={item} key={key} />
              ))}
            </ImageGridContainer>
            <PaginationComponent />
          </div>
        </>
      ) : (
        <div className="placeholder-container">
          <div className="image-cover">
            <img
              src={CreatePostPlaceholderIcon}
              alt="CreatePostPlaceholderIcon"
            />
          </div>
          <div className="text">
            Type in description to generate a new image
          </div>
        </div>
      )}
    </ImagePriviwerContainer>
  );
};

export default ImagePreviwer;
