import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { ROUTE_SIGN_IN } from "../routes/routes";

const DashboardLayout = ({ children }) => {
  const checkRedirection = () => {
    const remember_me = localStorage.getItem("remember_me");
    const remember_me_token = Cookies.get("remember_me_token");
    if (!remember_me && !remember_me_token) {
      localStorage.clear();
      window.location.href = ROUTE_SIGN_IN;
    }
  };
  useEffect(() => {
    checkRedirection();
  }, []);
  return <>{children}</>;
};

export default DashboardLayout;
