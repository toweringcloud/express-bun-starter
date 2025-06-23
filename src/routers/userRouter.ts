import express from "express";

import { githubLogin, githubCallback } from "../controllers/githubController";
import { edit, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github", githubLogin);
userRouter.get("/github/callback", githubCallback);
userRouter.get("/edit", edit);
userRouter.get("/:id", see);

export default userRouter;
