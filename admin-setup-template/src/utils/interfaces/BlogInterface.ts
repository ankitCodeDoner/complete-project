export interface BlogCategoryInt {
  id: number;
  name: string;
  subTitle: string;
  description: string;
  icon: string | null;
  url: string | null;
  backgroundImage: string | null;
  parentId: number | null;
  isMenu: boolean;
  createdDate: string;
  updatedDate: string | null;
  isActive: boolean;
  courseId: number | null;
}

export interface BlogAuthor {
  id: string;
  firstName: string;
}

export interface BlogDocument {
  id: number;
  name: string | null;
  url: string;
  remark: string | null;
  documentType: {
    id: number;
    name: string;
  };
}

export interface BlogData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  totalReadTime: number;
  totalPracticeTime: number;
  category: BlogCategoryInt;
  author: BlogAuthor;
  blogFor: {
    id: number;
    name: string;
  };
  readerHint: string;
  createdId: number;
  createdDate: string;
  thumbImage: string;
  isPublic: boolean;
  blogParagraphs: BlogParagraph[];
  blogDocuments: BlogDocument[];
  courses: any[];
  lectures: any[];
  blogMetas: any[];
  video: string;
}

export interface BlogParagraph {
  id: number;
  blog: {
    id: number;
    name: string;
  };
  title: string;
  subTitle: string;
  description: string;
  orderNo: number | null;
  author: {
    id: string;
    firstName: string;
  };
  documents: BlogDocument[];
}
