import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";
import commentsController from "./comments/comments.controller";
import tweetsService from "./tweets.service";
import {
  CreateTweetData,
  DeleteTweetData,
  UpdateTweetData,
} from "./tweets.type";

const tweetsController = Router();

tweetsController.get("/", async (_, res, next) => {
  try {
    const tweets = await tweetsService.getTweets();

    res.json(tweets);
  } catch (e) {
    next(e);
  }
});

tweetsController.post("/", userOnly, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user!.email;
    const createTweetData: CreateTweetData = {
      title,
      content,
      authorId,
    };
    const tweet = await tweetsService.createTweet(createTweetData);

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

tweetsController.patch("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const { title, content } = req.body;
    const authorId = req.user!.email;
    const updateTweetData: UpdateTweetData = {
      tweetId,
      title,
      content,
      authorId,
    };

    const updatedTweet = await tweetsService.updateTweet(updateTweetData);

    res.json(updatedTweet);
  } catch (e) {
    next(e);
  }
});

tweetsController.delete("/:tweetId", async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const authorId = req.user!.email;
    const data: DeleteTweetData = {
      tweetId,
      authorId,
    };

    const deletedTweet = await tweetsService.deleteTweet(data);

    res.json(deletedTweet);
  } catch (e) {
    next(e);
  }
});

tweetsController.use("/", commentsController);

export default tweetsController;
