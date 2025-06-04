// @ts-nocheck
import express from 'express';

const app = express();

// Custom Middlewares
const URLLogger = (req, res, next) => {
    console.log(`Path: ${req.path}`);
    next();
}
const TimeLogger = (req, res, next) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Time: ${currentDate} ${currentTime}`);
    next();
}
const SecurityLogger = (req, res, next) => {
    console.log(`${req.protocol === "https" ? "secure" : "insecure"} connection`);
    next();
}
const ProtectorMiddleware = (req, res, next) => {
    if (req.url === "/protected") {
        console.log("Access to this page is protected.");
        res.status(403).send("Access denied");
    } else next();
}
app.use(URLLogger);
app.use(TimeLogger);
app.use(SecurityLogger);
app.use(ProtectorMiddleware);

// Custom Routes
app.get("/", (req, res) => res.send("<h1>Home</h1>"))
app.get("/about", (req, res) => res.send("<h1>About</h1>"))
app.get("/contact", (req, res) => res.send("<h1>Contact</h1>"))
app.get("/login", (req, res) => res.send("<h1>Login</h1>"))

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
