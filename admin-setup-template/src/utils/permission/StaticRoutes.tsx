import Dashboard from "../../pages/dashboard/Dashboard";
import AssignMenu from "../../pages/menu/AssignMenu";
import Menus from "../../pages/menu/Menus";
import Setting from "../../pages/settings/Setting";
import Products from "../../pages/products/Products";
import Categories from "../../pages/categories/Categories";
import Brands from "../../pages/brands/Brands";
import Banners from "../../pages/banners/Banners";
import BlogPosts from "../../pages/blog-posts/BlogPosts";
import HomeStats from "../../pages/home-stats/HomeStats";
import HomeFeatures from "../../pages/home-features/HomeFeatures";
import ExportRegions from "../../pages/export-regions/ExportRegions";
import AboutPage from "../../pages/about-page/AboutPage";
import ContactPage from "../../pages/contact-page/ContactPage";
import Orders from "../../pages/orders/Orders";
import CustomerProfile from "../../pages/customer/CustomerProfile";
import CustomerNotifications from "../../pages/customer-notifications/CustomerNotifications";
import { AppEndPoints } from "../rout-endpoints/AppEndPoints";
import type { StaticRouteType } from "./interface/routesInterface";

export const StaticRoutes: StaticRouteType[] = [
  { path: AppEndPoints.DASHBOARD, claim: "Dashboard", element: <Dashboard /> },
  { path: AppEndPoints.SETTINGS, claim: "Settings", element: <Setting /> },
  { path: AppEndPoints.MENU_LIST, claim: "Menus", element: <Menus /> },
  { path: AppEndPoints.ASSIGN_MENU, claim: "Menus", element: <AssignMenu /> },

  // Catalogue
  { path: AppEndPoints.PRODUCT_LIST, claim: "Products", element: <Products /> },
  { path: AppEndPoints.SITE_CATEGORY_LIST, claim: "Categories", element: <Categories /> },
  { path: AppEndPoints.BRAND_LIST, claim: "Brands", element: <Brands /> },

  // Website content
  { path: AppEndPoints.BANNERS, claim: "Banners", element: <Banners /> },
  { path: AppEndPoints.BLOG_POSTS, claim: "BlogPosts", element: <BlogPosts /> },
  { path: AppEndPoints.HOME_STATS, claim: "HomeStats", element: <HomeStats /> },
  { path: AppEndPoints.HOME_FEATURES, claim: "HomeFeatures", element: <HomeFeatures /> },
  { path: AppEndPoints.EXPORT_REGIONS, claim: "ExportRegions", element: <ExportRegions /> },
  { path: AppEndPoints.ABOUT_PAGE, claim: "AboutPage", element: <AboutPage /> },
  { path: AppEndPoints.CONTACT_PAGE, claim: "ContactPage", element: <ContactPage /> },

  // Customers
  { path: AppEndPoints.ORDER_LIST, claim: "Orders", element: <Orders /> },
  { path: AppEndPoints.CUSTOMER_PROFILE, claim: "CustomerProfile", element: <CustomerProfile /> },
  {
    path: AppEndPoints.CUSTOMER_NOTIFICATIONS,
    claim: "CustomerNotifications",
    element: <CustomerNotifications />,
  },
];
