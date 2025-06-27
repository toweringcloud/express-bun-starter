import express from "express";

import { githubLogin, githubCallback } from "../controllers/githubController";
import {
  readProfile,
  updateProfile,
  updateProfileView,
  changePassword,
  changePasswordView,
} from "../controllers/userController";
import { avatarUpload, protector, publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/github", publicOnly, githubLogin);
userRouter.get("/github/callback", publicOnly, githubCallback);
userRouter.get("/:id", readProfile);
userRouter
  .route("/edit")
  .all(protector)
  .get(updateProfileView)
  .post(avatarUpload.single("avatar"), updateProfile);
userRouter
  .route("/change-pw")
  .all(protector)
  .get(changePasswordView)
  .post(changePassword);

export default userRouter;
