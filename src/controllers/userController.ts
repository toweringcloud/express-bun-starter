import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req: Request, res: Response) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req: Request, res: Response) => {
  const { username, email, password, password2 } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      username,
      email,
      password,
    });
    return res.redirect("/login");
  } catch (error: unknown) {
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
    return res.status(400).render("home", {
      pageTitle: "Home",
      errorMessage,
    });
  }
};

export const getLogin = (req: Request, res: Response) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password!);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy();
  return res.redirect("/");
};

export const see = (req: Request, res: Response) => res.send("See User");
export const edit = (req: Request, res: Response) => res.send("Edit User");
