import React from "react";
import { Input, Button, Divider, Card } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { SidebarContainer } from "./styled";
import { ImagePlaceholderIcon } from "../../assets/Images";

const Sidebar = ({ formik, isLoading }) => {
  return (
    <SidebarContainer>
      <div className="title">Image settings</div>
      <div className="image-satting-content">
        <div className="description-container">
          <label htmlFor="search">Description</label>
          <Input.Search
            placeholder="Describe in detail the image you want to get..."
            value={formik && formik.description}
            size="large"
            onKeyUp={(e) => {
              formik && formik.setFieldValue("description", e.target.value);
            }}
            onBlur={() => formik && formik.setFieldTouched("description")}
            status={formik && formik.errors.description && "error"}
          />
        </div>

        <Divider plain>or</Divider>
        <div className="upload-image">
          <div className="info-text">
            Upload a image to generate a new image
          </div>
          <div className="content">
            <div className="image-cover mb-3">
              <img src={ImagePlaceholderIcon} alt="" />
            </div>
            <Button
              type="dashed"
              icon={<PlusSquareOutlined />}
              className="button-flex"
            >
              Upload from library
            </Button>
          </div>
        </div>
        <div className="upload-button">
          <Button
            style={{ width: "100%" }}
            type="primary"
            onClick={() => formik.handleSubmit()}
            loading={isLoading}
            disabled={isLoading}
            size="large"
          >
            Generate Image
          </Button>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
