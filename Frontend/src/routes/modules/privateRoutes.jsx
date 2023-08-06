import {
  ROUTE_CHAT,
  ROUTE_CREATE_POST_PAGE,
  ROUTE_EXPLORE_PAGE,
  ROUTE_HOME_PAGE,
  ROUTE_MAINA_PAGE,
} from "../routes";

import Dashboard from "../../Views/Dashboard";
import ExplorePromts from "../../Views/ExplorePromts";
import CreateImage from "../../Views/CreateImage";
import DashboardLayout from "../../Layout/DashboardLayout";
import Chat from "../../Views/Chat";

const routes = [
  {
    path: ROUTE_MAINA_PAGE,
    component: (props) => (
      <DashboardLayout>
        <Dashboard {...props} />
      </DashboardLayout>
    ),
  },
  {
    path: ROUTE_HOME_PAGE,
    component: (props) => (
      <DashboardLayout>
        <Dashboard {...props} />
      </DashboardLayout>
    ),
  },
  {
    path: ROUTE_EXPLORE_PAGE,
    component: (props) => (
      <DashboardLayout>
        <ExplorePromts {...props} />
      </DashboardLayout>
    ),
  },
  {
    path: ROUTE_CREATE_POST_PAGE,
    component: (props) => (
      <DashboardLayout>
        <CreateImage {...props} />
      </DashboardLayout>
    ),
  },
  {
    path: ROUTE_CHAT,
    component: (props) => (
      <DashboardLayout>
        <Chat {...props} />
      </DashboardLayout>
    ),
  },
];

export default routes;
