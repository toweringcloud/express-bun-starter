import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  socialOnly: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  nickname: { type: String },
  location: { type: String },
  avatarUrl: { type: String },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    if (this.password) this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
