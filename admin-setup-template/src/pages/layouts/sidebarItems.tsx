import DashboardIcon from "@mui/icons-material/Dashboard";
import { APP_TEXT } from "../../utils/DefaultAppText.utils";
import { IoIosSettings } from "react-icons/io";
import { AppEndPoints } from "../../utils/rout-endpoints/AppEndPoints";

export const sidebarItems = [
  {
    label: APP_TEXT.sidebar.DASHBOARD,
    icon: <DashboardIcon />,
    link: AppEndPoints.DASHBOARD,
  },
  {
    label: APP_TEXT.sidebar.MASTER_SETTINGS,
    icon: <IoIosSettings />,
    children: [
      {
        label: APP_TEXT.sidebar.MENU,
        link: AppEndPoints.MENU_LIST,
      },
      {
        label: APP_TEXT.sidebar.ASSIGN_MENU,
        link: AppEndPoints.ASSIGN_MENU,
      },
      {
        label: APP_TEXT.sidebar.SETTINGS,
        link: AppEndPoints.SETTINGS,
      },
    ],
  },
];
