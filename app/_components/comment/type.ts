export type CommentType = {
  postId: string;
  _id: string;
  parentId?: string;
  avatar?: string;
  name?: string;
  content: string;
  createdAt: string;
  replies: CommentType[];
};
