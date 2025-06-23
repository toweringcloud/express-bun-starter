import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import movieRouter from "./routers/movieRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

// Templating Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Common Logger
const logger = morgan("dev");
app.use(logger);

// Cookie Session
app.use(
  session({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// Custom Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/movies", movieRouter);
app.use("/users", userRouter);

export default app;
