import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import storyRouter from "./routers/storyRouter";
import userRouter from "./routers/userRouter";

const app = express();

// Custom Middlewares
const logger = morgan("dev");
app.use(logger);

// Custom Routes
app.use("/", globalRouter);
app.use("/stories", storyRouter);
app.use("/users", userRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
