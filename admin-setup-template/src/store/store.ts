import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authApi from "./services/auth/authSlice";
import enumApi from "./services/enum/enumSlice";
import menuTypeApi from "./services/menu-type/menuTypeSlice";
import userTypeApi from "./services/user-type/userTypeSlice";
import menuApi from "./services/menu/menuSlice";
import userRoleApi from "./services/user-role/userRoleSlice";
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [enumApi.reducerPath]: enumApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [menuTypeApi.reducerPath]: menuTypeApi.reducer,
  [userTypeApi.reducerPath]: userTypeApi.reducer,
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
      userTypeApi.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
