import {
  ROUTE_MAINA_PAGE,
  ROUTE_QR_CODE,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../routes";

import Login from "../../Views/authentication/Login";
import Registration from "../../Views/authentication/Registration";
import Qrcode from "../../Qrcode";

const routes = [
  {
    path: ROUTE_MAINA_PAGE,
    component: Login,
  },
  {
    path: ROUTE_SIGN_IN,
    component: Login,
  },
  {
    path: ROUTE_SIGN_UP,
    component: Registration,
  },
  {
    path: ROUTE_QR_CODE,
    component: Qrcode,
  },
];
export default routes;
