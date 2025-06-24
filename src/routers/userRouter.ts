import express from "express";

import { githubLogin, githubCallback } from "../controllers/githubController";
import { edit, see } from "../controllers/userController";
import { protector, publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/github", publicOnly, githubLogin);
userRouter.get("/github/callback", publicOnly, githubCallback);
userRouter.get("/edit", protector, edit);
userRouter.get("/:id", protector, see);

export default userRouter;
