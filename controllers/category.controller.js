import categoriesModel from "../models/Category.model.js";

// Category CRUD Controllers Functions
const allCategory = async (req, res) => {
  res.render("admin/categories");
};

const addCategoryPage = async (req, res) => {
  res.render("admin/categories/create");
};

const addCategory = async (req, res) => {

};

const updateCategoryPage = async (req, res) => {
  res.render("admin/categories/update");
};

const updateCategory = async (req, res) => {

};

const deleteCategory = async (req, res) => {

};

export default {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
