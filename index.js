import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import path from "path";
import flash from "connect-flash";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";

connectDB()
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engin', 'ejs')

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});