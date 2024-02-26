import { Router } from "express";
import accountsController from "./accounts/accounts.controller";
import bookmarksController from "./bookmarks/bookmarks.controller";
import followsController from "./follows/follows.controller";
import tweetsController from "./tweets/tweets.controller";

const controllers = Router();

controllers.get("/health-check", (_, res) => {
  console.log("health-check");
  res.json("health-check");
});

controllers.use("/accounts", accountsController);
controllers.use("/tweets", tweetsController);
controllers.use(followsController);
controllers.use(bookmarksController);

export default controllers;
