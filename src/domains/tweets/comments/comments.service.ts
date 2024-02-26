import prismaClient from "../../../prisma/client.prisma";
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from "./comments.type";

const createComment = async (createCommentData: CreateCommentData) => {
  const { authorId, tweetId, content } = createCommentData;
  console.log();
  const comment = await prismaClient.comment.create({
    data: {
      content,
      author: { connect: { userId: authorId } },
      tweet: { connect: { id: tweetId } },
    },
  });

  return comment;
};

const updateComment = async (updateCommentData: UpdateCommentData) => {
  const { tweetId, authorId, commentId, content } = updateCommentData;
  const updatedComment = await prismaClient.comment.update({
    where: { id: commentId, authorId, tweetId },
    data: { content },
  });

  return updatedComment;
};

const deleteComment = async (deleteCommentData: DeleteCommentData) => {
  const { tweetId, commentId, authorId } = deleteCommentData;
  const deletedComment = await prismaClient.comment.delete({
    where: { id: commentId, tweetId, authorId },
  });

  return deletedComment;
};

const commentsService = {
  createComment,
  updateComment,
  deleteComment,
};

export default commentsService;
