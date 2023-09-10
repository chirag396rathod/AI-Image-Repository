import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import { Provider } from "react-redux";

import { ACCESS_TOKEN } from "./Utils/constants";
import indexRoutes from "./routes";
import Header from "./Components/Header";
import Store from "./Utils/store";

const RenderRoutes = () => {
  return (
    <>
      {indexRoutes.map((page, key) => (
        <Route path={page.path} Component={page.component} key={key} />
      ))}
    </>
  );
};
const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Suspense
          fallback={
            <Spin size="large">
              <div className="content" />
            </Spin>
          }
        >
          {ACCESS_TOKEN && <Header />}
          <Routes>{RenderRoutes()}</Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
