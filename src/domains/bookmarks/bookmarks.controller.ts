import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";
import bookmarksService from "./bookmarks.service";

const bookmarksController = Router();

bookmarksController.put(
  "/tweets/:tweetId/bookmarks",
  userOnly,
  async (req, res, next) => {
    try {
      const tweetId = Number(req.params.tweetId);
      const userId = req.user!.email;
      const bookmark = await bookmarksService.addBookmark(tweetId, userId);

      res.json(bookmark);
    } catch (e) {
      next(e);
    }
  }
);

bookmarksController.delete(
  "/tweets/:tweetId/bookmarks",
  userOnly,
  async (req, res, next) => {
    try {
      const tweetId = Number(req.params.tweetId);
      const userId = req.user!.email;
      const deletedBookmark = await bookmarksService.deleteBookmark(
        tweetId,
        userId
      );

      res.json(deletedBookmark);
    } catch (e) {
      next(e);
    }
  }
);

bookmarksController.get("/bookmarks", userOnly, async (req, res, next) => {
  try {
    const userId = req.user!.email;
    const bookmarks = await bookmarksService.getBookmarks(userId);

    res.json(bookmarks);
  } catch (e) {
    next(e);
  }
});

export default bookmarksController;
