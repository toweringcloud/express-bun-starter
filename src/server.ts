import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import storyRouter from "./routers/storyRouter";
import userRouter from "./routers/userRouter";
import movieRouter from "./routers/movieRouter";

import { localsMiddleware } from './middlewares';
import './db';

const app = express();

// Templating Engine
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// Custom Middlewares
const logger = morgan("dev");
app.use(logger);
app.use(localsMiddleware)

// Custom Routes
app.use("/", globalRouter);
app.use("/stories", storyRouter);
app.use("/users", userRouter);
app.use("/movies", movieRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
