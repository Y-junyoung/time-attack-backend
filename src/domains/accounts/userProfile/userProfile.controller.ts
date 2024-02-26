import { Router } from "express";
import userOnly from "./../../../guards/userOnly.guard";
import { default as userProfileService } from "./userProfile.service";

const userProfileController = Router();

userProfileController.put("/", userOnly, async (req, res, next) => {
  try {
    const { nickname, description } = req.body;
    const userId = req.user!.email;
    const user = await userProfileService.updateProfile({
      userId,
      nickname,
      description,
    });

    res.json(user);
  } catch (e) {
    next(e);
  }
});

userProfileController.get("/:userId", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const userProfile = await userProfileService.getProfile(userId);

    res.json(userProfile);
  } catch (e) {
    next(e);
  }
});

userProfileController.get("/:userId/followings", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const userFollowings = await userProfileService.getFollowings(userId);

    res.json(userFollowings);
  } catch (e) {
    next(e);
  }
});

userProfileController.get("/:userId/followers", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const userFollowers = await userProfileService.getFollowers(userId);

    res.json(userFollowers);
  } catch (e) {
    next(e);
  }
});

export default userProfileController;
