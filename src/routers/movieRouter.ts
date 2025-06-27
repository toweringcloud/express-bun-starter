import express from "express";

import {
  createMovie,
  createMovieView,
  readMovie,
  updateMovie,
  updateMovieView,
  deleteMovie,
} from "../controllers/movieController";
import { movieUpload, protector } from "../middlewares";

const movieRouter = express.Router();

movieRouter
  .route("/upload")
  .all(protector)
  .get(createMovieView)
  .post(movieUpload.single("movie"), createMovie);
movieRouter.route("/:id([0-9a-f]{24})").get(readMovie);
movieRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protector)
  .get(updateMovieView)
  .post(movieUpload.single("movie"), updateMovie);
movieRouter.route("/:id([0-9a-f]{24})/delete").all(protector).get(deleteMovie);

export default movieRouter;
