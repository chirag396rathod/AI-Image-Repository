import {
  ROUTE_CREATE_POST_PAGE,
  ROUTE_EXPLORE_PAGE,
  ROUTE_HOME_PAGE,
  ROUTE_MAINA_PAGE,
} from "../routes";

import Dashboard from "../../Views/Dashboard";
import ExplorePromts from "../../Views/ExplorePromts";
import CreateImage from "../../Views/CreateImage";

const routes = [
  {
    path: ROUTE_MAINA_PAGE,
    component: Dashboard,
  },
  {
    path: ROUTE_HOME_PAGE,
    component: Dashboard,
  },
  {
    path: ROUTE_EXPLORE_PAGE,
    component: ExplorePromts,
  },
  {
    path: ROUTE_CREATE_POST_PAGE,
    component: CreateImage,
  },
];

export default routes;
