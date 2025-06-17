import express from "express";

import {
  listMovie,
  searchMovie,
  watchMovie,
  addMovie,
  createMovie,
  editMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const movieRouter = express.Router();
// queries
movieRouter.get("/", listMovie);
movieRouter.get("/search", searchMovie);
movieRouter.get("/movies/:id([0-9a-f]{24})", watchMovie);
// mutations
movieRouter.route("/upload").get(addMovie).post(createMovie);
movieRouter
  .route("/movies/:id([0-9a-f]{24})/edit")
  .get(editMovie)
  .post(updateMovie);
movieRouter.route("/movies/:id([0-9a-f]{24})/delete").get(deleteMovie);

export default movieRouter;
