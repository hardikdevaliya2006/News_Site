import express from "express";
import articleController from "../controllers/article.controller.js";
import categoryController from "../controllers/category.controller.js";
import commentController from "../controllers/comment.controller.js";
import userController from "../controllers/user.controller.js";
import isLoginUser from "../middleware/isLoginUser.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/multer.js";
import isValid from "../middleware/validation.js"

const router = express.Router();

// Login Routes
router.get("/", userController.loginPage);
router.post("/index", isValid.loginValidation, userController.adminLogin);
router.get("/logout", userController.logout);
router.get("/dashboard", isLoginUser, userController.dashBoard);
router.get("/settings", isLoginUser, isAdmin, userController.settings);
router.post(
  "/saveSettings",
  isLoginUser,
  isAdmin,
  upload.single("website_logo"),
  userController.saveSettings
);

// User CRUD Routes
router.get("/users", isLoginUser, isAdmin, userController.allUser);
router.get("/add-user", isLoginUser, isAdmin, userController.addUserPage);
router.post("/add-user", isLoginUser, isAdmin, isValid.userValidation, userController.addUser);
router.get(
  "/update-user/:id",
  isLoginUser,
  isAdmin,
  userController.updateUserPage
);
router.post(
  "/update-user/:id",
  isLoginUser,
  isAdmin,
  isValid.userUpdateValidation,
  userController.updateUser
);
router.delete(
  "/delete-user/:id",
  isLoginUser,
  isAdmin,
  userController.deleteUser
);

// Category CRUD Operations
router.get("/category", isLoginUser, isAdmin, categoryController.allCategory);
router.get(
  "/add-category",
  isLoginUser,
  isAdmin,
  categoryController.addCategoryPage
);
router.post(
  "/add-category",
  isLoginUser,
  isAdmin,
  isValid.categoryValidation,
  categoryController.addCategory
);
router.get(
  "/update-category/:id",
  isLoginUser,
  isAdmin,
  categoryController.updateCategoryPage
);
router.post(
  "/update-category/:id",
  isLoginUser,
  isAdmin,
  isValid.categoryValidation,
  categoryController.updateCategory
);
router.delete(
  "/delete-category/:id",
  isLoginUser,
  isAdmin,
  categoryController.deleteCategory
);

// Article CRUD Operations
router.get("/article", isLoginUser, articleController.allArticle);
router.get("/add-article", isLoginUser, articleController.addArticlePage);
router.post(
  "/add-article",
  isLoginUser,
  upload.single("image"),
  isValid.articleValidation,
  articleController.addArticle
);
router.get(
  "/update-article/:id",
  isLoginUser,
  articleController.updateArticlePage
);
router.post(
  "/update-article/:id",
  isLoginUser,
  upload.single("image"),
  isValid.articleValidation,
  articleController.updateArticle
);
router.delete(
  "/delete-article/:id",
  isLoginUser,
  articleController.deleteArticle
);

// Comments Routes
router.get("/comments", isLoginUser, commentController.allComments);

// 404 Middleware
router.use((req, res, next) => {
  res.status(404).render("admin/404", {
    message: "Page Not Found",
    role: req.role,
  });
});

// 500 Middleware
router.use((error, req, res, next) => {
  console.error(error.stack);
  const status = error.status || 500;
  let view;
  switch (status) {
    case 401:
      view = "admin/401";
      break;
    case 404:
      view = "admin/404";
      break;
    case 500:
      view = "admin/500";
      break;
    default:
      view = "admin/500";
  }
  res.status(status).render(view, {
    message: error.message || "Something Went Wrong",
    role: req.role,
  });
});

export default router;
