import type { Course, User } from "./CourseInterface";

export interface CompanyQuery {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

export interface WebQuery {
  name: string;
  phoneNo: number;
  email: string;
  subject: string;
  detail: string;
  city: string;
  qualification: string;
  courseId: number | null;
  course: {
    id: number;
    name: string;
  } | null;
  organisationId: number;
}

export interface AffiliationRequestProps {
  id: number;
  isActive: boolean;
  createdDate: string;
  status: {
    id: number;
    name: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    affiliationCode: string | null;
    emailConfirmed: boolean;
    isActive: boolean;
    affiliationSatuts: {
      id: number;
      name: string;
    };
  };
}

export interface UserPurchase {
  id: number;
  createdDate: string;
  invoiceNumber: string;
  saleType: {
    id: number;
    name: string;
  };
  user: User;
  course: Course;
  netAmount: number;
}
