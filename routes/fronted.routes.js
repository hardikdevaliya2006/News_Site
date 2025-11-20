import express from "express";
import siteController from "../controllers/site.controller.js";
import loadCommanData from "../middleware/loadCommanData.js";
const router = express.Router();

router.use(loadCommanData)

router.get("/", siteController.index);
router.get("/category/:name", siteController.articleByCategories);
router.get("/single/:id", siteController.singleArticle);
router.get("/search", siteController.search);
router.get("/author/:id", siteController.author);
router.post("/single/:id", siteController.addComment); 

export default router;