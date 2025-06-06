import express from "express";
import { list, info, edit } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get('/', list);
userRouter.get("/:id(\\d+)", info);
userRouter.get('/edit-profile', edit);

export default userRouter;
