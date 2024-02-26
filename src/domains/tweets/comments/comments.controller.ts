import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";
import commentsService from "./comments.service";
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from "./comments.type";

const commentsController = Router();

commentsController.post(
  "/:tweetId/comments",
  userOnly,
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const authorId = req.user!.email;
      const tweetId = Number(req.params.tweetId);
      const createCommentData: CreateCommentData = {
        tweetId,
        content,
        authorId,
      };
      const comment = await commentsService.createComment(createCommentData);

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
);

commentsController.patch(
  "/:tweetId/comments/:commentId",
  userOnly,
  async (req, res, next) => {
    try {
      const tweetId = Number(req.params.tweetId);
      const commentId = Number(req.params.commentId);
      const { content } = req.body;
      const authorId = req.user!.email;
      const updateCommentData: UpdateCommentData = {
        tweetId,
        content,
        commentId,
        authorId,
      };

      const updatedComment = await commentsService.updateComment(
        updateCommentData
      );

      res.json(updatedComment);
    } catch (e) {
      next(e);
    }
  }
);

commentsController.delete(
  "/:tweetId/comments/:commentId",
  userOnly,
  async (req, res, next) => {
    try {
      const tweetId = Number(req.params.tweetId);
      const commentId = Number(req.params.commentId);
      const authorId = req.user!.email;
      const data: DeleteCommentData = {
        commentId,
        tweetId,
        authorId,
      };

      const deletedComment = await commentsService.deleteComment(data);

      res.json(deletedComment);
    } catch (e) {
      next(e);
    }
  }
);

export default commentsController;
