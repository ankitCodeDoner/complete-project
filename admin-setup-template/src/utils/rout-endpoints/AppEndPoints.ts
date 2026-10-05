export const AppEndPoints = {
  // Auth
  LOGIN: "/auth/login",
  REGISTRATION: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  OTP_VERIFICATION: "/auth/verify-otp",
  CHANGE_PASSWORD: "/auth/change-password",

  // Dashboard
  DASHBOARD: "/",

  // Course
  COURSE_LIST: "/courses",
  COURSE_CREATE: "/courses/new",
  COURSE_EDIT: "/courses/:id/edit",
  COURSE_USERS: "/courses/:id/users",
  COURSE_LECTURES: "/courses/:id/lectures",
  COURSE_LECTURE_CREATE: "/courses/:id/lectures/new",
  COURSE_LECTURE_EDIT: "/courses/:id/lectures/:lectureId/edit",
  COURSE_GROUP_LIST: "/groups/courses",

  // Tutorials / Lectures
  LIVE_LECTURES: "/lectures/live",
  COURSE_GROUPS: "/course-groups",

  // Quiz
  TEST_LIST: "/quizzes",
  TEST_CREATE: "/quizzes/new",
  TEST_EDIT: "/quizzes/:id/edit",
  TEST_QUESTION: "/quizzes/:id/questions",
  QUESTION_LIST: "/questions",
  QUESTION_CREATE: "/questions/new",
  QUESTION_EDIT: "/questions/:id/edit",
  QUESTION_TYPES: "/question-types",

  // Blog
  BLOG_LIST: "/blogs",
  BLOG_CREATE: "/blogs/new",
  BLOG_EDIT: "/blogs/:id/edit/:metaId?",
  CATEGORY_LIST: "/blog-categories",
  CATEGORY_CREATE: "/blog-categories/new",
  CATEGORY_EDIT: "/blog-categories/:id/edit",

  BLOG_PARAGRAPH: "/blogs/:id/blog-paragraphs",
  BLOG_PARAGRAPH_CREATE: "/blogs/:id/blog-paragraphs/new",
  BLOG_PARAGRAPH_EDIT: "/blogs/:id/blog-paragraphs/:paragraphId/edit",

  // Developer Tools
  PROJECT_LIST: "/developer/projects",
  PROJECT_CREATE: "/developer/projects/new",
  PROJECT_EDIT: "/developer/projects/:id/edit",
  PROJECT_API_LIST: "/developer/project-apis",
  PROJECT_API_CREATE: "/developer/project-apis/new",
  PROJECT_API_EDIT: "/developer/project-apis/:id/edit",

  // Comments
  USER_COMMENTS: "/comments",

  // Settings
  SETTINGS: "/settings",

  // Users
  USER_LIST: "/users",
  USER_INFO: "/users/:id",
  COMPANY_QUERIES: "/company-queries",
  WEB_QUERIES: "/web-queries",
  BANNERS: "/banners",
  BANNERS_CREATE: "/banners/new",
  BANNERS_EDIT: "/banners/:id/edit",
  USER_PURCHASES: "/user-purchases",
  AFFILIATION_REQUEST: "/affiliation-request",

  // Notification
  NOTIFICATION: "/notifications",

  // Organisation
  ORGANISATION_LIST: "/organisations",
  ORGANISATION_CREATE: "/organisations/new",
  ORGANISATION_EDIT: "/organisations/:id/edit",

  // Menu
  MENU_LIST: "/menus",
  MENU_CREATE: "/menus/new",
  MENU_EDIT: "/menus/:id/edit",

  ASSIGN_MENU: "/menus/assign",
};
