import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import createError from "../utils/error-message.js";
import { validationResult } from "express-validator";

// Article CRUD Controllers Functions
const allArticle = async (req, res, next) => {
  try {
    let articles;
    if (req.role === "admin") {
      articles = await newsModel
        .find()
        .populate("category", "name")
        .populate("author", "fullname");
    } else {
      articles = await newsModel
        .find({ author: req.id })
        .populate("category", "name")
        .populate("author", "fullname");
    }
    res.render("admin/articles", { role: req.role, articles });
  } catch (error) {
    next(error);
  }
};

const addArticlePage = async (req, res) => {
  const category = await categoriesModel.find();
  res.render("admin/articles/create", { category, role: req.role, error: 0 });
};

const addArticle = async (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    const category = await categoriesModel.find();
    return res.render("admin/articles/create", { category, role: req.role, error: error.array() });
  }

  try {
    const { title, content, category } = req.body;
    const article = new newsModel({
      title,
      content,
      category,
      author: req.id,
      image: req.file.filename,
    });
    await article.save();
    res.redirect("/admin/article");
  } catch (error) {
    next(error);
  }
};

const updateArticlePage = async (req, res, next) => {
  const id = req.params.id;

  try {
    const article = await newsModel
      .findById(id)
      .populate("category", "name")
      .populate("author", "fullname _id");

    if (!article) {
      return next(createError("Article Not Found", 404));
    }

    if (req.role === "author") {
      if (req.id.toString() !== article.author._id.toString()) {
        return next(createError("Unauthorized", 401));
      }
    }

    const categories = await categoriesModel.find();
    res.render("admin/articles/update", {
      article,
      categories,
      role: req.role,
      error: 0
    });
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    const categories = await categoriesModel.find();
    return res.render("admin/articles/update", {
      article: req.body,
      categories,
      role: req.role, error: error.array()
    });
  }

  const id = req.params.id;
  try {
    const { title, content, category } = req.body;
    const article = await newsModel.findById(id);

    if (!article) {
      return next(createError("Article Not Found", 404));
    }

    if (req.role === "author") {
      if (req.id.toString() !== article.author.toString()) {
        return next(createError("Unauthorized", 401));
      }
    }

    article.title = title;
    article.content = content;
    article.category = category;

    if (req.file) {
      const oldImagePath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../public/uploads",
        article.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      article.image = req.file.filename;
    }

    await article.save();
    res.redirect("/admin/article");
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  const id = req.params.id;
  try {
    const article = await newsModel.findById(id);
    if (!article) {
      return next(createError("Article Not Found", 404));
    }

    if (req.role === "author") {
      if (req.id !== article.author.toString()) {
        return next(createError("Unauthorized", 401));
      }
    }

    try {
      const imagePath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../public/uploads",
        article.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      console.error("Error to delete the image : ", error);
    }

    await article.deleteOne();
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  allArticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
};
