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
  
  USER: {
    USER_GET: "/user/search",
    GET_BY_ID: (id: string | number | undefined) => `/user/${id}`,
    LOOKUP: "/user/lookup",
  },

  USER_TYPE: {
    BASE: "/user-type",
    GET_ALL: "/user-type",
    GET_BY_ID: (id: string | number | undefined) => `/user-type/${id}`,
    CREATE: "/user-type",
    UPDATE: (id: string | number) => `/user-type/${id}`,
    DELETE: (id: string | number) => `/user-type/${id}`,
    LOOKUP: "/user-type/lookup",
  },

  // ── MedVance website content ────────────────────────────────
  DASHBOARD: {
    SUMMARY: "/dashboard",
  },

  PRODUCT: {
    GET_ALL: "/product",
    GET_BY_ID: (id: string | number | undefined) => `/product/${id}`,
    CREATE: "/product",
    UPDATE: (id: string | number) => `/product/${id}`,
    DELETE: (id: string | number) => `/product/${id}`,
    REORDER: "/product/reorder",
  },

  CATEGORY: {
    GET_ALL: "/category",
    GET_BY_ID: (id: string | number | undefined) => `/category/${id}`,
    CREATE: "/category",
    UPDATE: (id: string | number) => `/category/${id}`,
    DELETE: (id: string | number) => `/category/${id}`,
    REORDER: "/category/reorder",
  },

  BRAND: {
    GET_ALL: "/brand",
    GET_BY_ID: (id: string | number | undefined) => `/brand/${id}`,
    CREATE: "/brand",
    UPDATE: (id: string | number) => `/brand/${id}`,
    DELETE: (id: string | number) => `/brand/${id}`,
    REORDER: "/brand/reorder",
  },

  BANNER: {
    GET_ALL: "/banner",
    GET_BY_ID: (id: string | number | undefined) => `/banner/${id}`,
    CREATE: "/banner",
    UPDATE: (id: string | number) => `/banner/${id}`,
    DELETE: (id: string | number) => `/banner/${id}`,
    REORDER: "/banner/reorder",
  },

  BLOG: {
    GET_ALL: "/blog",
    GET_BY_ID: (id: string | number | undefined) => `/blog/${id}`,
    CREATE: "/blog",
    UPDATE: (id: string | number) => `/blog/${id}`,
    DELETE: (id: string | number) => `/blog/${id}`,
    REORDER: "/blog/reorder",
  },

  STAT: {
    GET_ALL: "/stat",
    CREATE: "/stat",
    UPDATE: (id: string | number) => `/stat/${id}`,
    DELETE: (id: string | number) => `/stat/${id}`,
    REORDER: "/stat/reorder",
  },

  FEATURE: {
    GET_ALL: "/feature",
    CREATE: "/feature",
    UPDATE: (id: string | number) => `/feature/${id}`,
    DELETE: (id: string | number) => `/feature/${id}`,
    REORDER: "/feature/reorder",
  },

  REGION: {
    GET_ALL: "/region",
    CREATE: "/region",
    UPDATE: (id: string | number) => `/region/${id}`,
    DELETE: (id: string | number) => `/region/${id}`,
    REORDER: "/region/reorder",
  },

  COMPANY: {
    GET: "/company",
    UPDATE: "/company",
  },

  CONTACT: {
    GET: "/contact",
    UPDATE: "/contact",
  },

  CUSTOMER: {
    PROFILE: "/customer/profile",
    ADDRESSES: "/customer/address",
  },

  ORDER: {
    GET_ALL: "/order",
    GET_BY_ID: (id: string | undefined) => `/order/${id}`,
    UPDATE: (id: string) => `/order/${id}`,
  },

  NOTIFICATION: {
    GET_ALL: "/notification",
    CREATE: "/notification",
    UPDATE: (id: string) => `/notification/${id}`,
    DELETE: (id: string) => `/notification/${id}`,
  },
};
