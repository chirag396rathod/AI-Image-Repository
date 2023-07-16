import { ACCESS_TOKEN } from "../Utils/constants";
import PrivateRoute from "./modules/privateRoutes";
import PublicRoute from "./modules/publicRoutes";

const indexRoutes = ACCESS_TOKEN ? [...PrivateRoute] : [...PublicRoute];

export default indexRoutes;
