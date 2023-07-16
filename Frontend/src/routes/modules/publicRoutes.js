import { ROUTE_SIGN_IN, ROUTE_SIGN_UP } from "../routes";

import Login from "../../Views/authentication/Login";
import Registration from "../../Views/authentication/Registration";

const routes = [
  {
    path: ROUTE_SIGN_IN,
    component: Login,
  },
  {
    path: ROUTE_SIGN_UP,
    component: Registration,
  },
];
export default routes;
