import Dashboard from "../../pages/dashboard/Dashboard";
import AssignMenu from "../../pages/menu/AssignMenu";
import Menus from "../../pages/menu/Menus";
import Setting from "../../pages/settings/Setting";
import { AppEndPoints } from "../rout-endpoints/AppEndPoints";
import type { StaticRouteType } from "./interface/routesInterface";

export const StaticRoutes: StaticRouteType[] = [
  { path: AppEndPoints.DASHBOARD, claim: "Dashboard", element: <Dashboard /> },
  { path: AppEndPoints.SETTINGS, claim: "Settings", element: <Setting /> },
  { path: AppEndPoints.MENU_LIST, claim: "Menus", element: <Menus /> },
  { path: AppEndPoints.ASSIGN_MENU, claim: "Menus", element: <AssignMenu /> },
];
