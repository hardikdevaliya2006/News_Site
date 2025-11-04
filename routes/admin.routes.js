import express from "express";
import articleController from "../controllers/article.controller.js";
import categoryController from "../controllers/category.controller.js";
import commentController from "../controllers/comment.controller.js";
import userController from "../controllers/user.controller.js";
import isLoginUser from "../middleware/isLoginUser.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Login Routes
router.get("/", userController.loginPage);
router.post("/index", userController.adminLogin);
router.get("/logout", userController.logout);
router.get("/dashboard", isLoginUser, userController.dashBoard);
router.get("/settings", isLoginUser, isAdmin, userController.settings);

// User CRUD Routes
router.get("/users", isLoginUser, isAdmin, userController.allUser);
router.get("/add-user", isLoginUser, isAdmin, userController.addUserPage);
router.post("/add-user", isLoginUser, isAdmin, userController.addUser);
router.get("/update-user/:id", isLoginUser, isAdmin, userController.updateUserPage);
router.post("/update-user/:id", isLoginUser, isAdmin, userController.updateUser);
router.delete("/delete-user/:id", isLoginUser, isAdmin, userController.deleteUser);

// Category CRUD Operations
router.get("/category", isLoginUser, isAdmin, categoryController.allCategory);
router.get("/add-category", isLoginUser, isAdmin, categoryController.addCategoryPage);
router.post("/add-category", isLoginUser, isAdmin, categoryController.addCategory);
router.get("/update-category/:id", isLoginUser, isAdmin, categoryController.updateCategoryPage);
router.post("/update-category/:id", isLoginUser, isAdmin, categoryController.updateCategory);
router.delete("/delete-category/:id", isLoginUser, isAdmin, categoryController.deleteCategory);

// Article CRUD Operations
router.get("/article", isLoginUser, articleController.allArticle);
router.get("/add-article", isLoginUser, articleController.addArticlePage);
router.post("/add-article", isLoginUser, articleController.addArticle);
router.get("/update-article/:id", isLoginUser, articleController.updateArticlePage);
router.post("/update-article/:id", isLoginUser, articleController.updateArticle);
router.delete("/delete-article/:id", isLoginUser, articleController.deleteArticle);

// Comments Routes
router.get("/comments", isLoginUser, commentController.allComments);

export default router;