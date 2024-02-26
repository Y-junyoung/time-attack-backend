export type CreateCommentData = {
  tweetId: number;
  authorId: string;
  content: string;
};

export type UpdateCommentData = {
  tweetId: number;
  authorId: string;
  content: string;
  commentId: number;
};

export type DeleteCommentData = {
  tweetId: number;
  authorId: string;
  commentId: number;
};
