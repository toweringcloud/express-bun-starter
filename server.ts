// @ts-nocheck
import express from 'express';

const app = express();
const PORT: number = parseInt(process.env.PORT || '4000', 10);

app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/about", (req, res) => res.send("<h1>About</h1>"));
app.get("/contact", (req, res ) => res.send("<h1>Contact</h1>"));
app.get("/login", (req, res ) => res.send("<h1>Login</h1>"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
