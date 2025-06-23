import express from "express";

import {
  addMovie,
  createMovie,
  watchMovie,
  editMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.route("/upload").get(addMovie).post(createMovie);
movieRouter.route("/:id([0-9a-f]{24})").get(watchMovie);
movieRouter.route("/:id([0-9a-f]{24})/edit").get(editMovie).post(updateMovie);
movieRouter.route("/:id([0-9a-f]{24})/delete").get(deleteMovie);

export default movieRouter;
