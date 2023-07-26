import React, { useState } from "react";
import { Button, Divider } from "antd";
import { FILTER_TAB_LIST } from "../../Utils/constants";
import { FiltersTabContainer } from "./styled";

const FiltersTab = ({ handleChange }) => {
  const [select, setSelect] = useState("All");

  const handleSelect = (title) => {
    setSelect(title);
    handleChange(title);
  };

  return (
    <FiltersTabContainer>
      <div className="filter-list">
        {FILTER_TAB_LIST.map((item, key) => (
          <>
            <Button
              type={item.title === select ? "primary" : "text"}
              key={key}
              onClick={() => handleSelect(item.title)}
              className="filter-item"
            >
              {item.title}
            </Button>
            {key === 0 && (
              <Divider orientation="right" type="vertical" plain></Divider>
            )}
          </>
        ))}
      </div>
    </FiltersTabContainer>
  );
};

export default FiltersTab;
