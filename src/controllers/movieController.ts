import type { Request, Response } from "express";
import Movie, { formatGenres, formatYear } from "../models/Movie.js";
import User from "../models/User";

// queries (read-list/search/watch)
export const listMovie = async (req: Request, res: Response) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });
  return res.render("home", { pageTitle: "Home", movies });
};

export const searchMovie = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  let movies: unknown = [];
  if (keyword) {
    movies = await Movie.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
    console.log(keyword, movies);
  }
  return res.render("search", { pageTitle: "Search Movie", keyword, movies });
};

export const watchMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await Movie.findById(id).populate("owner");
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("watch", { pageTitle: movie.title, movie });
};

// mutations (create, update, delete)
export const addMovie = (req: Request, res: Response) => {
  return res.render("upload", { pageTitle: "Upload Movie" });
};
export const createMovie = async (req: Request, res: Response) => {
  const {
    body: { title, summary, year, genres, posterImage },
    session: { user },
    file,
  } = req;
  try {
    if (!title || !summary || !year || !genres) {
      throw new Error("Mandatory fields are required.");
    }
    const newMovie = await Movie.create({
      title,
      summary,
      year: formatYear(year),
      genres: formatGenres(genres),
      posterImage,
      fileUrl: file ? file.path : undefined,
      owner: user._id,
    });
    const userInfo = await User.findById(user._id);
    if (userInfo) {
      userInfo.movies.push(newMovie._id);
      userInfo.save();
    }
    return res.redirect("/");
  } catch (error: unknown) {
    console.error("Error adding movie:", error);
    let errorMessage: string = "Unknown Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "_message" in error
    ) {
      errorMessage = (error as { _message: string })._message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return res.render("upload", {
      pageTitle: "Add Movie",
      errorMessage,
    });
  }
};

export const editMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.session;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  if (String(movie.owner) !== String(user._id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${movie.title}`, movie });
};
export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.session;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  if (String(movie.owner) !== String(user._id)) {
    return res.status(403).redirect("/");
  }
  const {
    body: { title, summary, year, rating, genres, posterImage },
    file,
  } = req;
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year: formatYear(year),
    rating: rating ? parseFloat(rating) : 0,
    genres: formatGenres(genres),
    posterImage,
    fileUrl: file ? file.path : undefined,
    updatedAt: Date.now(),
  });
  return res.redirect("/");
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.session;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).render("404", { pageTitle: "Movie not found." });
  }
  if (String(movie.owner) !== String(user._id)) {
    return res.status(403).redirect("/");
  }
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};
