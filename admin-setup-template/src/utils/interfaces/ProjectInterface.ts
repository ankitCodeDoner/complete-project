export interface Project {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  subDescription: string;
  thumbUrl: string | null;
  icon: string;
  isPublic: boolean;
  isPaid: boolean;
}
 export interface ProjectForm {
    Title: string;
    SubTitle: string;
    Description: string;
    SubDescription: string;
    ThumbUrl: File | null;
    Icon: string;
    MangerId: number;
    TypeId: string;
    Tag: string;
    CategoryId: string;
    IsPublic: boolean;
    IsPaid: boolean;
    DocumentUrl: File | null;
  }
 export interface ProjectApi {
    methodType: number;
    url: string;
    requestBody: string;
    requestHeader: string;
    responseBody: string;
    responseHeader: string;
    title: string;
    description: string;
    subDescription: string;
    projectId: number;
    documentTypeId: number;
    document: File | null;
  }