export default async function isAdmin(req, res, next) {
  if (req.role == "admin") {
    return next();
  }
  res.redirect("/admin/dashboard");
}
