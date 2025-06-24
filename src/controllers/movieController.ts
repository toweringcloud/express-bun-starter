import type { Request, Response } from "express";
import Movie, { formatGenres, formatYear } from "../models/Movie.js";

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
  return res.render("search", { pageTitle: "Search", keyword, movies });
};

export const watchMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("detail", { pageTitle: movie.title, movie });
};

// mutations (create, update, delete)
export const addMovie = (req: Request, res: Response) => {
  return res.render("upload", { pageTitle: "Upload Movie" });
};
export const createMovie = async (req: Request, res: Response) => {
  const { title, summary, year, genres, posterImage } = req.body;
  try {
    if (!title || !summary) {
      throw new Error("Mandatory fields are required.");
    }
    await Movie.create({
      title,
      summary,
      year: formatYear(year),
      genres: formatGenres(genres),
      posterImage,
    });
    return res.redirect("/");
  } catch (error: unknown) {
    console.error("Error adding movie:", error);
    let errorMessage: string = "Unknown Error";

    // 타입 가드를 사용하여 error의 타입을 좁힙니다.
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
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${movie.title}`, movie });
};
export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await Movie.exists({ _id: id });
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  const { title, summary, year, rating, genres, posterImage } = req.body;
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year: formatYear(year),
    rating: rating ? parseFloat(rating) : 0,
    genres: formatGenres(genres),
    posterImage,
    updatedAt: Date.now(),
  });
  return res.redirect("/");
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};
