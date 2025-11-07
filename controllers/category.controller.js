import categoriesModel from "../models/Category.model.js";

// Category CRUD Controllers Functions
const allCategory = async (req, res) => {
  const categories = await categoriesModel.find();
  res.render("admin/categories", { categories, role: req.role });
};

const addCategoryPage = async (req, res) => {
  res.render("admin/categories/create", { role: req.role });
};

const addCategory = async (req, res) => {
  try {
    await categoriesModel.create(req.body);
    res.redirect("/admin/category");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateCategoryPage = async (req, res) => {
  try {
    const category = await categoriesModel.findById(req.params.id);
    if (!category) {
      return res.status(404).send("Category Not Found");
    }
    res.render("admin/categories/update", { category, role: req.role });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoriesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).send("Category Not Found");
    }
    res.redirect("/admin/category");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoriesModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send("Category Not Found");
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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