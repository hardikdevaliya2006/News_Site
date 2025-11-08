import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";

// Article CRUD Controllers Functions
const allArticle = async (req, res) => {
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
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const addArticlePage = async (req, res) => {
  const category = await categoriesModel.find();
  res.render("admin/articles/create", { category, role: req.role });
};

const addArticle = async (req, res) => {
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
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateArticlePage = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await newsModel
      .findById(id)
      .populate("category", "name")
      .populate("author", "fullname");
    if (!article) {
      return res.status(404).send("Article Not Found");
    }
    if (req.role === "author") {
      if (req.id !== article.author.id) {
        return res.status(404).send("Unothrized");
      }
    }

    const categories = await categoriesModel.find();
    res.render("admin/articles/update", {
      article,
      categories,
      role: req.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, content, category } = req.body;
    const article = await newsModel.findById(id);
    if (!article) {
      return res.status(404).send("Article Not Found");
    }
    if (req.role === "author") {
      if (req.id !== article.author.id) {
        return res.status(404).send("Unothrized");
      }
    }

    article.title = title;
    article.content = content;
    article.category = category;

    if (req.file) {
      article.image = req.file.filename;
    }

    await article.save();
    res.redirect("/admin/article");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await newsModel.findById(id);
    if (!article) {
      return res.status(404).send("Article Not Found");
    }
    if (req.role === "author") {
      if (req.id !== article.author.id) {
        return res.status(404).send("Unothrized");
      }
    }

    await article.deleteOne();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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
