import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import { ImagePriviwerContainer } from "./styled";
import { ImageGridContainer } from "../../globle-stled";
import ImageComponent from "../../Components/ImageComponent";
import { CreatePostPlaceholderIcon } from "../../assets/Images";
import PaginationComponent from "../../Components/PaginationComponent";
import { LoaderContainer } from "../../Components/Loader";
import FiltersTab from "../../Components/FiltersTab";

const ImagePreviwer = ({
  pagination,
  isLoading,
  title,
  handlePageChange,
  data,
  handleFilterChange,
  type,
}) => {
  const navigator = useNavigate();
  const { page } = useParams();

  const startIndex = (page - 1) * 10;
  const endIndex = page * 10;

  return (
    <ImagePriviwerContainer>
      <div className="flex-headr">
        <Button
          className="button-flex"
          icon={<LeftOutlined />}
          type="default"
          onClick={() => navigator(-1)}
        >
          Back
        </Button>
        {data.length > 0 && <FiltersTab handleChange={handleFilterChange} />}
      </div>
      {isLoading ? (
        <LoaderContainer />
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <header>
                <div className="info-text">
                  Showing Results for "{title || ""}"
                </div>
                <div className="page-text">{`${startIndex + 1}-${endIndex} of ${
                  pagination.total
                }`}</div>
              </header>
              <div className="container-border">
                <ImageGridContainer>
                  {data.map((item, key) => (
                    <ImageComponent
                      page={page}
                      data={item}
                      key={key}
                      isFrom="generate-image"
                      type={type}
                    />
                  ))}
                </ImageGridContainer>
                <PaginationComponent
                  total={parseInt(pagination.total)}
                  curruntIndex={page}
                  handlePageChange={(e) => handlePageChange(e)}
                />
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
        </>
      )}
    </ImagePriviwerContainer>
  );
};

export default ImagePreviwer;
