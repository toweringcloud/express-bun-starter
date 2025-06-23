import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (
  req: any,
  res: { render: (arg0: string, {}) => any }
) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (
  req: any,
  res: { redirect: (arg0: string) => any; status: (arg0: number) => any }
) => {
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
  } catch (error: any) {
    return res.status(400).render("home", {
      pageTitle: "Home",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (
  req: any,
  res: { render: (arg0: string, {}) => any }
) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (
  req: any,
  res: { redirect: (arg0: string) => any; status: (arg0: number) => any }
) => {
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

export const logout = (req: any, res: { redirect: (arg0: string) => any }) => {
  req.session.destroy();
  return res.redirect("/");
};

export const see = (req: any, res: { send: (arg0: string) => any }) =>
  res.send("See User");
export const edit = (req: any, res: { send: (arg0: string) => any }) =>
  res.send("Edit User");
