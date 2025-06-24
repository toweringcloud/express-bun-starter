import express from "express";

import { listMovie, searchMovie } from "../controllers/movieController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { protector, publicOnly } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", listMovie);
rootRouter.get("/search", searchMovie);
rootRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin);
rootRouter.get("/logout", protector, logout);

export default rootRouter;
