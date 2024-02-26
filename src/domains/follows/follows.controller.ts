import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";
import followsService from "./follows.service";
import {
  DeleteFollowerData,
  FollowUserData,
  UnFollowUserData,
} from "./follows.type";

const followsController = Router();

followsController.post(
  "/followings/:userId",
  userOnly,
  async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const followingId = req.user!.email;
      const followUserData: FollowUserData = {
        followingId,
        userId,
      };

      const following = await followsService.followUser(followUserData);

      res.json(following);
    } catch (e) {
      next(e);
    }
  }
);

followsController.delete(
  "/followings/:userId",
  userOnly,
  async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const followingId = req.user!.email;
      const unFollowUserData: UnFollowUserData = {
        followingId,
        userId,
      };
      const unFollowing = await followsService.unFollowUser(unFollowUserData);

      res.json(unFollowing);
    } catch (e) {
      next(e);
    }
  }
);

followsController.delete(
  "/followers/:userId",
  userOnly,
  async (req, res, next) => {
    try {
      const followerId = req.user!.email;
      const userId = Number(req.params.userId);
      const deleteFollowerData: DeleteFollowerData = {
        userId,
        followerId,
      };

      const deleteFollower = await followsService.deleteFollower(
        deleteFollowerData
      );

      res.json(deleteFollower);
    } catch (e) {
      next(e);
    }
  }
);

export default followsController;
