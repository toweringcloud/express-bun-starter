import express from "express";
import morgan from "morgan";

import { localsMiddleware } from "./middlewares";
import movieRouter from "./routers/movieRouter";

const app = express();
const logger = morgan("dev");

// Templating Engine
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// Custom Middlewares
app.use(logger);
app.use(localsMiddleware);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Custom Routes
app.use("/", movieRouter);

export default app;
