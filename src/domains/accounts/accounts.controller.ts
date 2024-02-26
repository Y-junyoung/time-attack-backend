import { Router } from "express";
import userProfileController from "./userProfile/userProfile.controller";
import usersController from "./users/users.controller";

const accountsController = Router();

accountsController.use("/users", usersController);
accountsController.use("/users", userProfileController);

export default accountsController;
