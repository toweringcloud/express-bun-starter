import express from "express";

import { githubLogin, githubCallback } from "../controllers/githubController";
import {
  getEdit,
  postEdit,
  getChange,
  postChange,
  see,
} from "../controllers/userController";
import { protector, publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/github", publicOnly, githubLogin);
userRouter.get("/github/callback", publicOnly, githubCallback);
userRouter.route("/edit").all(protector).get(getEdit).post(postEdit);
userRouter.route("/change-pw").all(protector).get(getChange).post(postChange);
userRouter.get("/:id", see);

export default userRouter;
