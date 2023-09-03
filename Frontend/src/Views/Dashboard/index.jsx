import React, { useEffect, useState } from "react";
import { DownOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Dropdown, message, Space, Button, Tooltip, Empty, Input } from "antd";

import ImageComponent from "../../Components/ImageComponent";
import FiltersTab from "../../Components/FiltersTab";
import { SortIcon } from "../../assets/Images";
import { SortMenu } from "./data";
import { DashboardContainer, DashboardMain, Header } from "./styled";
import { ROUTE_EXPLORE_PAGE } from "../../routes/routes";
import { ImageGridContainer } from "../../globle-stled";
import PaginationComponent from "../../Components/PaginationComponent";
import { Toast } from "../../Components/Toater";
import { LoaderContainer } from "../../Components/Loader";
import { apiInstance } from "../../Utils/axios";

const Dashboard = () => {
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const refresh = async (page, type, sort, search_str) => {
    try {
      setLoading(true);
      const response = await apiInstance({
        method: "POST",
        url: `${import.meta.env.VITE_BASE__DEV_API_URL}/get-share-image`,
        data: {
          type: type || "All",
          sort: sort || -1,
          search_str: search_str || "",
          pagination: {
            page: page || 1,
            limit: 10,
          },
        },
      });
      const { success, data } = response.data;
      if (success === "1") {
        setImagesList(data.data);
        setLoading(false);
        setPagination({
          page: page || 1,
          limit: 10,
          total: data?.totle || pagination.total,
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

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const handleChangeSort = (data) => {
    const { value } = data?.item?.props;
    if (value) {
      refresh(1, filter, value);
    }
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  const handlePageChange = (page) => {
    refresh(page, filter);
    setPagination({
      page: page,
      limit: 10,
      total: pagination.total,
    });
  };

  const startIndex = (pagination.page - 1) * 10;
  const endIndex = pagination.page * 10;

  const handleChangeFilter = (type) => {
    refresh(1, type);
    setPagination({
      page: 1,
      limit: 10,
      total: pagination.total,
    });
    setFilter(type);
  };

  const handleSearch = (value) => {
    if (value) {
      refresh(1, filter, -1, value);
    }
  };

  useEffect(() => {
    if (filter) {
      refresh(1, filter);
    }
  }, [filter]);

  return (
    <DashboardContainer>
      <FiltersTab handleChange={handleChangeFilter} />
      <div className="container-xxl">
        <Header className="my-4">
          <div className="left-side">
            <Dropdown menu={{ items: SortMenu, onClick: handleChangeSort }}>
              <img src={SortIcon} alt="" />
            </Dropdown>
            <Tooltip placement="bottom" title="Expore Now! 🧐" color={"black"}>
              <Button className="mx-4">
                <Link to={ROUTE_EXPLORE_PAGE}>Explore Random Prompts 🤯</Link>
              </Button>
            </Tooltip>
          </div>
          <div className="input-search">
            <Input.Search
              placeholder="Search images... "
              enterButton="Search"
              onSearch={(e) => handleSearch(e)}
              loading={isLoading}
            />
          </div>
          <div className="right-side">
            <div className="page-index ">
              <span>
                {startIndex + 1}-
                {endIndex > parseInt(pagination.total)
                  ? pagination.total
                  : endIndex}
              </span>
              <span className="mx-2">of</span>
              <span>{pagination.total}</span>
            </div>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
              className="mx-4"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="button-flex">
                  Newest
                  <DownOutlined size={"10px"} />
                </Space>
              </a>
            </Dropdown>
            <Tooltip placement="bottom" title="Grid View" color={"black"}>
              <AppstoreOutlined style={{ fontSize: "120%" }} />
            </Tooltip>
          </div>
        </Header>
        <DashboardMain>
          <div className="dashboard-heading">Newest</div>
          {isLoading ? (
            <>
              <LoaderContainer />
            </>
          ) : (
            <>
              {imagesList.length === 0 ? (
                <>
                  <Empty />
                </>
              ) : (
                <ImageGridContainer>
                  {imagesList.map((item, key) => (
                    <>
                      <ImageComponent
                        data={item}
                        key={key}
                        isFrom="dashboard"
                      />
                    </>
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
        </DashboardMain>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
