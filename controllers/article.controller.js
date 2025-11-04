import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";

// Article CRUD Controllers Functions
const allArticle = async (req, res) => {
  res.render("admin/articles", { role: req.role });
};

const addArticlePage = async (req, res) => {
  res.render("admin/articles/create", { role: req.role });
};

const addArticle = async (req, res) => {};

const updateArticlePage = async (req, res) => {
  res.render("admin/articles/update", { role: req.role });
};

const updateArticle = async (req, res) => {};

const deleteArticle = async (req, res) => {};

export default {
  allArticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
};
