import express from "express";
import siteController from "../controllers/site.controller.js";
const router = express.Router();

router.get("/", siteController.index());
router.get("/category/:name", siteController.articleByCategories());
router.get("/single/:id", siteController.index());
router.get("/search", siteController.search());
router.get("/author/:name", siteController.author());
router.get("/single/:id", siteController.addComment());

export default router;
