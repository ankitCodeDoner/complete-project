export const ApiEndPoints = {
  USER_LOGIN: {
    BASE: `/user/login`,
    LOGIN: `/user/login`,
    FORGET_PASSWORD: `/user/forget-password`,
    RESET_PASSWORD: `/user/reset-password`,
    CHANGE_PASSWORD: `/user/change-password`,
    VERIFY_OTP: `/user/verify-otp`,
  },
  ENUM: {
    DOCUMENT_TYPE: "/document/type/lookup",
  },

  MENU: {
    BASE: "/menu",
    GET_ALL: "/menu",
    GET_BY_ID: (id: string | number | undefined) => `/menu/${id}`,
    CREATE: "/menu",
    UPDATE: (id: string | number) => `/menu/${id}`,
    DELETE: (id: string | number) => `/menu/${id}`,
    LOOKUP: "/menu/lookup",
  },

  MENU_TYPE: {
    BASE: "/menu/type",
    GET_ALL: "/menu/type",
    GET_BY_ID: (id: string | number | undefined) => `/menu/type/${id}`,
    CREATE: "/menu/type",
    UPDATE: (id: string | number) => `/menu/type/${id}`,
    DELETE: (id: string | number) => `/menu/type/${id}`,
    LOOKUP: "/menu/type/lookup",
  },

  USER_ROLE: {
    BASE: "/user/role",
    GET_ALL: "/user/role",
    GET_BY_ID: (id: string | number | undefined) => `/user/role/${id}`,
    CREATE: "/user/role",
    UPDATE: (id: string | number) => `/user/role/${id}`,
    DELETE: (id: string | number) => `/user/role/${id}`,
    USER_GET: "/user/search",
    LOOKUP: "/user/role/lookup",
  },
  
  USER: {},

  USER_TYPE: {
    BASE: "/user-type",
    GET_ALL: "/user-type",
    GET_BY_ID: (id: string | number | undefined) => `/user-type/${id}`,
    CREATE: "/user-type",
    UPDATE: (id: string | number) => `/user-type/${id}`,
    DELETE: (id: string | number) => `/user-type/${id}`,
    LOOKUP: "/user-type/lookup",
  },
};
