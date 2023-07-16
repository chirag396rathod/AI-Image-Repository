import React from "react";
import {
  DownOutlined,
  AppstoreOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Dropdown, message, Space, Button, Tooltip, Tag, Badge } from "antd";

import ImageComponent from "../../Components/ImageComponent";
import FiltersTab from "../../Components/FiltersTab";
import { data } from "./data";
import { SortIcon } from "../../assets/Images";
import { DashboardContainer, DashboardMain, Header } from "./styled";
import { ROUTE_EXPLORE_PAGE } from "../../routes/routes";
import { ImageGridContainer } from "../../globle-stled";
import PaginationComponent from "../../Components/PaginationComponent";

const Dashboard = () => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
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

  return (
    <DashboardContainer>
      <FiltersTab />
      <div className="container-xxl">
        <Header className="my-4">
          <div className="left-side">
            <Tooltip placement="bottom" title="Sort" color={"black"}>
              <img src={SortIcon} alt="" />
            </Tooltip>
            <Tooltip placement="bottom" title="Expore Now! 🧐" color={"black"}>
              <Button className="mx-4">
                <Link to={ROUTE_EXPLORE_PAGE}>Explore Random Prompts 🤯</Link>
              </Button>
            </Tooltip>
          </div>
          <div className="right-side">
            <div className="page-index ">
              <span>1-50</span>
              <span className="mx-2">of</span>
              <span>948</span>
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
            <Tooltip placement="bottom" title="List View" color={"black"}>
              <PicCenterOutlined
                className="mx-3"
                style={{ fontSize: "120%" }}
              />
            </Tooltip>
          </div>
        </Header>
        <DashboardMain>
          <div className="dashboard-heading">Newest</div>
          <ImageGridContainer>
            {data.map((item, key) => (
              <ImageComponent data={item} key={key} />
            ))}
          </ImageGridContainer>
          <PaginationComponent />
        </DashboardMain>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
