import { validationResult } from "express-validator";
import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import createError from "../utils/error-message.js";

// Category CRUD Controllers Functions
const allCategory = async (req, res) => {
  const categories = await categoriesModel.find();
  res.render("admin/categories", { categories, role: req.role });
};

const addCategoryPage = async (req, res) => {
  res.render("admin/categories/create", { role: req.role, error: 0 });
};

const addCategory = async (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.render("admin/categories/create", { role: req.role, error: error.array() });
  }

  try {
    await categoriesModel.create(req.body);
    res.redirect("/admin/category");
  } catch (error) {
    next(error);
  }
};

const updateCategoryPage = async (req, res, next) => {
  try {
    const category = await categoriesModel.findById(req.params.id);
    if (!category) {
      return next(createError("Category Not Found", 404));
    }
    res.render("admin/categories/update", { category, role: req.role, error: 0 });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    const category = await categoriesModel.findById(req.params.id);
    return res.render("admin/categories/update", { category, role: req.role, error: error.array() });
  }

  const { id } = req.params;
  try {
    const category = await categoriesModel.findById(id);
    if (!category) {
      return next(createError("Category Not Found", 404));
    }

    category.name = req.body.name
    category.description = req.body.description

    await category.save()
    res.redirect("/admin/category");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const id = req.params.id
  try {
    const category = await categoriesModel.findById(id);
    if (!category) {
      return next(createError("Category Not Found", 404));
    }

    const article = await newsModel.findOne({ category: id })
    if (article) {
      return res.status(400).json({ success: false, message: 'Category Is Associated with Article' });
    }

    await category.deleteOne()
    res.json({ success: false })
  } catch (error) {
    next(error);
  }
};

export default {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
