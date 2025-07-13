import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 50 },
  summary: { type: String, required: true, trim: true, minLength: 20 },
  fileUrl: { type: String },
  posterImage: { type: String },
  year: { type: Number, default: new Date().getFullYear() },
  genres: [{ type: String }],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
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
