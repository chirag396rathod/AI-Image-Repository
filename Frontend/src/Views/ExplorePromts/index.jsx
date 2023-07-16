import React from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { LeftOutlined } from "@ant-design/icons";
import ImageComponent from "../../Components/ImageComponent";
import { data } from "../Dashboard/data";
import { ImageGridContainer } from "../../globle-stled";
import PaginationComponent from "../../Components/PaginationComponent";

const ExplorePromtsContainer = styled.div`
  .main-title {
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    padding-bottom: 20px;
  }
  .search-container {
    max-width: 50%;
    margin: auto;
    padding: 20px;
  }
  .container-border {
  }
`;

const ExplorePromts = () => {
  const navigate = useNavigate();
  return (
    <ExplorePromtsContainer className="container-xxl my-5">
      <div className="main-title mb-3 with-back-btn">
        <Button
          type="default"
          className="button-flex"
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
        >
          <span>Back</span>
        </Button>
        <span className="mx-3">Exlopre Random Prompts</span>
      </div>
      <div className="search-container mb-3">
        <Input.Search
          placeholder="Generate image using random 'Prompts' "
          onSearch={() => {}}
          enterButton="Generate Image"
        />
      </div>

      <ImageGridContainer className="container-border">
        {data.map((item, key) => (
          <ImageComponent data={item} key={key} />
        ))}
      </ImageGridContainer>
      <PaginationComponent />
    </ExplorePromtsContainer>
  );
};

export default ExplorePromts;
