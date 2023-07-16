import React, { useState } from "react";
import { Button, Divider } from "antd";
import { FILTER_TAB_LIST } from "../../Utils/constants";
import { FiltersTabContainer } from "./styled";

const FiltersTab = () => {
  const [select, setSelect] = useState(0);

  const handleSelect = (id) => {
    setSelect(id);
  };

  return (
    <FiltersTabContainer>
      <div className="filter-list">
        {FILTER_TAB_LIST.map((item, key) => (
          <>
            <Button
              type={key === select ? "primary" : "text"}
              key={key}
              onClick={() => handleSelect(key)}
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
