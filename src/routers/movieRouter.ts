import express from "express";

import {
  addMovie,
  createMovie,
  watchMovie,
  editMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";
import { movieUpload, protector } from "../middlewares";

const movieRouter = express.Router();

movieRouter
  .route("/upload")
  .all(protector)
  .get(addMovie)
  .post(movieUpload.single("movie"), createMovie);
movieRouter.route("/:id([0-9a-f]{24})").get(watchMovie);
movieRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protector)
  .get(editMovie)
  .post(movieUpload.single("movie"), updateMovie);
movieRouter.route("/:id([0-9a-f]{24})/delete").all(protector).get(deleteMovie);

export default movieRouter;
