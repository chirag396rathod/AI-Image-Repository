import React from "react";
import { Input, Button, Divider } from "antd";
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
            onKeyUp={(e) => {
              formik && formik.setFieldValue("description", e.target.value);
            }}
            onBlur={() => formik && formik.setFieldTouched("description")}
            status={formik && formik.errors.description && "error"}
          />
        </div>
        <div className="select-style-container ">
          <label>Select style</label>
          <div className="row style-row">
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
            <div className="col-4">
              <div className="style-cover">
                <img src="https://picsum.photos/100" alt="style" />
              </div>
            </div>
          </div>
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
          >
            Generate Image
          </Button>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
