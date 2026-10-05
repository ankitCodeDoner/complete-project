export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  icon: string;
  description: string;
  documentId: number;
  organisationId: number;
  organisation: Organisation;
}

export interface CourseMode {
  id: number;
  name: string;
}

export interface CourseLevel {
  id: number;
  name: string;
}

export interface CourseFee {
  id: number;
  name: string;
  typeId: CourseFeeType | null | string;
  amount: number;
  tax: number;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  parent: any;
  category: Category;
  courseMode: CourseMode;
  courseLevel: CourseLevel;
  thumbUrl: string | null;
  courseImage: string | null;
  orderNumber: number;
  totalLectures: number;
  completedLectures: number | null;
  totalHours: number;
  startDate: string; // e.g. "2025-06-01"
  endDate: string;
  isNew: boolean;
  isPrimary: boolean;
  hsl: number;
  courseFees: CourseFee[];
}

export interface AffiliationStatus {
  id: number;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  emailConfirmed: boolean;
  refillId: number;
  affiliationCode: string | null;
  userTypeId: number;
  affiliationCodeUserId: string | null;
  completedLessons: any;
  completedCourses: any;
  lastPaymentDate: string | null;
  totalCourses: number;
  totalPayments: number;
  isActive: boolean;
  lastActivityDate: string;
  userProfile: any;
  affiliationSatuts: AffiliationStatus;
  userCourses: any[];
  sales: any[];
  userLectures: any[];
  userAddresses: any[];
  comments: any[];
  notes: any[];
}

interface Organisation {
  id: number;
  name: string;
  logo: string | null;
  tagLine: string | null;
  type: number;
  webSite: string;
  phoneNumber: number;
  email: string;
  facebook: string;
  linkedIn: string;
  instagram: string;
  description: string;
}

interface CourseFeeType {
  id: number;
  name: string;
}

export interface CourseGroupType {
  id: number;
  title: string;
  subTitle: string;
  courses: Course[];
  organisationId: number;
  organisation: Organisation;
}
