import express from "express";
import { see, edit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", see);
userRouter.get("/edit", edit);

export default userRouter;
