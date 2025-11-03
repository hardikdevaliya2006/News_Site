import express from "express";
import articleController from "../controllers/article.controller.js";
import categoryController from "../controllers/category.controller.js";
import commentController from "../controllers/comment.controller.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// Login Routes
router.get("/", userController.loginPage);
router.post("/index", userController.adminLogin);
router.get("/logout", userController.logout);
router.get("/dashboard", userController.dashBoard);
router.get("/settings", userController.settings);

// User CRUD Routes
router.get("/users", userController.allUser);
router.get("/add-user", userController.addUserPage);
router.post("/add-user", userController.addUser);
router.get("/update-user/:id", userController.updateUserPage);
router.post("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
 
// Category CRUD Operations
router.get("/category", categoryController.allCategory);
router.get("/add-category", categoryController.addCategoryPage);
router.post("/add-category", categoryController.addCategory);
router.get("/update-category/:id", categoryController.updateCategoryPage);
router.post("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);

// Article CRUD Operations
router.get("/article", articleController.allArticle);
router.get("/add-article", articleController.addArticlePage);
router.post("/add-article", articleController.addArticle);
router.get("/update-article/:id", articleController.updateArticlePage);
router.post("/update-article/:id", articleController.updateArticle);
router.delete("/delete-article/:id", articleController.deleteArticle);

// Comments Routes  
router.get("/comments", commentController.allComments);

export default router;
