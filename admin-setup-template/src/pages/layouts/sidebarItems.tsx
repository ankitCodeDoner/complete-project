import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WebIcon from "@mui/icons-material/Web";
import PeopleIcon from "@mui/icons-material/People";
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
    label: APP_TEXT.sidebar.CATALOGUE,
    icon: <Inventory2Icon />,
    children: [
      { label: APP_TEXT.sidebar.PRODUCTS, link: AppEndPoints.PRODUCT_LIST },
      { label: APP_TEXT.sidebar.CATEGORIES, link: AppEndPoints.SITE_CATEGORY_LIST },
      { label: APP_TEXT.sidebar.BRANDS, link: AppEndPoints.BRAND_LIST },
    ],
  },
  {
    label: APP_TEXT.sidebar.WEBSITE_CONTENT,
    icon: <WebIcon />,
    children: [
      { label: APP_TEXT.sidebar.BANNERS, link: AppEndPoints.BANNERS },
      { label: APP_TEXT.sidebar.HOME_STATS, link: AppEndPoints.HOME_STATS },
      { label: APP_TEXT.sidebar.HOME_FEATURES, link: AppEndPoints.HOME_FEATURES },
      { label: APP_TEXT.sidebar.BLOG_POSTS, link: AppEndPoints.BLOG_POSTS },
      { label: APP_TEXT.sidebar.ABOUT_PAGE, link: AppEndPoints.ABOUT_PAGE },
      { label: APP_TEXT.sidebar.CONTACT_PAGE, link: AppEndPoints.CONTACT_PAGE },
      { label: APP_TEXT.sidebar.EXPORT_REGIONS, link: AppEndPoints.EXPORT_REGIONS },
    ],
  },
  {
    label: APP_TEXT.sidebar.CUSTOMERS,
    icon: <PeopleIcon />,
    children: [
      { label: APP_TEXT.sidebar.ORDERS, link: AppEndPoints.ORDER_LIST },
      { label: APP_TEXT.sidebar.CUSTOMER_PROFILE, link: AppEndPoints.CUSTOMER_PROFILE },
      {
        label: APP_TEXT.sidebar.CUSTOMER_NOTIFICATIONS,
        link: AppEndPoints.CUSTOMER_NOTIFICATIONS,
      },
    ],
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
