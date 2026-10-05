import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authApi from "./services/auth/authSlice";
import enumApi from "./services/enum/enumSlice";
import menuTypeApi from "./services/menu-type/menuTypeSlice";
import userTypeApi from "./services/user-type/userTypeSlice";
import menuApi from "./services/menu/menuSlice";
import userRoleApi from "./services/user-role/userRoleSlice";
import dashboardApi from "./services/dashboard/dashboardSlice";
import productApi from "./services/product/productSlice";
import categoryApi from "./services/category/categorySlice";
import brandApi from "./services/brand/brandSlice";
import bannerApi from "./services/banner/bannerSlice";
import blogApi from "./services/blog/blogSlice";
import statApi from "./services/stat/statSlice";
import featureApi from "./services/feature/featureSlice";
import regionApi from "./services/region/regionSlice";
import companyApi from "./services/company/companySlice";
import contactApi from "./services/contact/contactSlice";
import customerApi from "./services/customer/customerSlice";
import orderApi from "./services/order/orderSlice";
import notificationApi from "./services/notification/notificationSlice";

const siteApis = [
  dashboardApi,
  productApi,
  categoryApi,
  brandApi,
  bannerApi,
  blogApi,
  statApi,
  featureApi,
  regionApi,
  companyApi,
  contactApi,
  customerApi,
  orderApi,
  notificationApi,
] as const;

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [enumApi.reducerPath]: enumApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [menuTypeApi.reducerPath]: menuTypeApi.reducer,
  [userTypeApi.reducerPath]: userTypeApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [statApi.reducerPath]: statApi.reducer,
  [featureApi.reducerPath]: featureApi.reducer,
  [regionApi.reducerPath]: regionApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      enumApi.middleware,
      userRoleApi.middleware,
      menuTypeApi.middleware,
      menuApi.middleware,
      userTypeApi.middleware,
      ...siteApis.map((api) => api.middleware)
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
