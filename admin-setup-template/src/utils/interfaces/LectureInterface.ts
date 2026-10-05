import type React from "react";

export interface LectureType {
  id: number;
  name: string;
}

interface User {
  id: string;
  firstName: string;
}

export interface ZoomMeeting {
  id: number;
  topic: string;
  agenda: string;
  hostEmail: string;
  meetingNumber: number;
  password: string;
  duration: number;
  startDate: string;
  createdDate: string;
}

export interface LiveLecture {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  parent: any | null;
  lectureType: LectureType;
  thumbUrl: string | null;
  durations: string;
  startDate: string;
  endDate: string;
  isNew: boolean;
  isCompleted: boolean | null;
  lectureBy: User;
  zoomMeeting: ZoomMeeting | null;
}

export interface Lecture {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  durations: string;
  lectureLinkUrl: string | null;
  lectureById: string;
  userName: string | null;
  isCompleted: boolean;
  parentId: number | null;
  children: Lecture[];
  lectureDocuments: any[];
  lectureBlogs: any[];
}

// component props

interface BlogParagraph {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  documents: { id: number; url: string }[];
}

interface BlogData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  blogParagraphs: BlogParagraph[];
}

interface EditValues {
  title: string;
  subTitle: string;
  description: string;
}

interface EditMode {
  title: boolean;
  subTitle: boolean;
  description: boolean;
}

export interface LectureBlogProps {
  lectureBlogData: BlogData | null;
  editValues: EditValues;
  setEditValues: React.Dispatch<React.SetStateAction<EditValues>>;
  editMode: EditMode;
  setEditMode?: React.Dispatch<React.SetStateAction<EditMode>>;
  isEditing?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    values: EditValues,
    helpers: { setSubmitting: (v: boolean) => void }
  ) => void;
}
