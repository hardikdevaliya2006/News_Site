import jwt from "jsonwebtoken";

export default async function isLoginUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/admin/");
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.id = tokenData.id;
    req.role = tokenData.role;
    req.fullname = tokenData.fullname;
    next()
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).send("Unauthorized: Invalid or expired token");
  }
}