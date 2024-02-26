import { Router } from "express";
import { default as usersService } from "./users.service";

const usersController = Router();

usersController.post("/sign-up", async (req, res, next) => {
  try {
    const {
      email,
      password,
      profile: { nickname, description },
    } = req.body;
    const user = await usersService.signUp({
      email,
      password,
      profile: { nickname, description },
    });

    res.json(user);
  } catch (e) {
    next(e);
  }
});

usersController.post("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await usersService.logIn({ email, password });

    res.json({ accessToken });
  } catch (e) {
    next(e);
  }
});

export default usersController;
