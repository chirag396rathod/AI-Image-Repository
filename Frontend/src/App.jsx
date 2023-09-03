import React, { Suspense, useEffect } from "react";
import { Spin } from "antd";
import indexRoutes from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";

import { ACCESS_TOKEN } from "./Utils/constants";
import { io } from "socket.io-client";
import SocketClient from "./Utils/SocketClient";

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
  );
};

export default App;
