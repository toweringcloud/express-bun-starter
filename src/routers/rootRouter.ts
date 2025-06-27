import express from "express";

import { listMovie, searchMovie } from "../controllers/movieController";
import {
  signup,
  signupView,
  signin,
  signinView,
  signout,
} from "../controllers/userController";
import { protector, publicOnly } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", listMovie);
rootRouter.get("/search", searchMovie);
rootRouter.route("/join").all(publicOnly).get(signupView).post(signup);
rootRouter.route("/login").all(publicOnly).get(signinView).post(signin);
rootRouter.get("/logout", protector, signout);

export default rootRouter;
