import React, { useEffect, useState } from "react";
import { Input, Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { LeftOutlined } from "@ant-design/icons";
import ImageComponent from "../../Components/ImageComponent";
import { data } from "../Dashboard/data";
import { ImageGridContainer } from "../../globle-stled";
import PaginationComponent from "../../Components/PaginationComponent";
import { RANDOM_PROMPTS } from "../../Utils/constants";
import { LoaderContainer } from "../../Components/Loader";
import { Toast } from "../../Components/Toater";
import axios from "axios";
import { apiInstance } from "../../Utils/axios";

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
  const rendom_index = Math.trunc(
    Math.abs(Math.random() * RANDOM_PROMPTS.length)
  );
  const [searchvalue, setSearchvalue] = useState(RANDOM_PROMPTS[rendom_index]);
  const [isLoading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const handleSearch = async (page) => {
    setSearchvalue(RANDOM_PROMPTS[rendom_index]);
    setLoading(true);
    try {
      const respose = await apiInstance({
        url: `${import.meta.env.VITE_BASE__DEV_API_URL}/generate-image`,
        method: "post",
        data: {
          prompt: RANDOM_PROMPTS[rendom_index],
          type: "All",
          pagination: {
            page: page || pagination.page,
            limit: 10,
          },
        },
      });
      const { result } = respose.data;
      if (result) {
        setLoading(false);
        setImagesList(result.data);
        setPagination({
          page: pagination.page,
          limit: 10,
          total: result?.next?.totle,
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

  const handlePageChange = (e) => {
    if (e) {
      handleSearch(e);
      setPagination({
        page: e,
        ...pagination,
      });
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, []);

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
          enterButton="Generate Image"
          value={searchvalue}
          size="large"
          onSearch={() => handleSearch()}
          loading={isLoading}
        />
      </div>

      {isLoading ? (
        <LoaderContainer />
      ) : (
        <>
          {imagesList.length === 0 ? (
            <Empty />
          ) : (
            <ImageGridContainer className="container-border">
              {imagesList.map((item, key) => (
                <ImageComponent
                  page={pagination.page}
                  data={item}
                  key={key}
                  isFrom="generate-image"
                  type={"All"}
                />
              ))}
            </ImageGridContainer>
          )}
        </>
      )}
      <PaginationComponent
        total={parseInt(pagination.total)}
        curruntIndex={pagination.page}
        handlePageChange={(e) => handlePageChange(e)}
      />
    </ExplorePromtsContainer>
  );
};

export default ExplorePromts;
