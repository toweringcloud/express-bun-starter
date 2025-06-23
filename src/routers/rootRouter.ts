import express from "express";

import { listMovie, searchMovie } from "../controllers/movieController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", listMovie);
rootRouter.get("/search", searchMovie);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/logout").get(logout);

export default rootRouter;
