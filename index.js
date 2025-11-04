import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import path from "path";
import flash from "connect-flash";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import frontedRoutes from "./routes/fronted.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";

connectDB();
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.use(cookieParser())
app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");

// Fronted Routes
app.get("/", frontedRoutes);

// Admin Routes
app.use("/admin", (req, res, next) => {
  res.locals.layout = "admin/layout";
  next();
});
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
