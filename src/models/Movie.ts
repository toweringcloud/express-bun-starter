import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 50 },
  summary: { type: String, required: true, trim: true, minLength: 20 },
  year: { type: Number, default: new Date().getFullYear() },
  rating: { type: Number, default: 0 },
  genres: [{ type: String }],
  posterImage: { type: String },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export const formatYear = (year: string): number => {
  const parsed = parseInt(year, 10);
  return isNaN(parsed) ? new Date().getFullYear() : parsed;
};
export const formatGenres = (genres: string): string[] => {
  const parsed = genres.split(",").map((genre) => genre.trim());
  return !parsed ? [] : parsed;
};

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
