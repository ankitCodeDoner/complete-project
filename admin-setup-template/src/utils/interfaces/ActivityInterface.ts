interface Lecture {
  id: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
}

export interface CommentItemType {
  id: number;
  text: string;
  isPublic: boolean;
  parentId: number | null;
  createdId: string | null;
  created: User | null;
  replybyId: string;
  user: User;
  createdDate: string;
  typeId: number;
  lectures: (Lecture | null)[];
  blogs: (any | null)[];
  children: CommentItemType[];
}
