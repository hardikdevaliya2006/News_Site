import mongoose from "mongoose";
import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";
import commentModel from "../models/Comment.model.js";

// Site Controllers Functions
const index = async (req, res) => {
  res.render("index");
};

const articleByCategories = async (req, res) => {
  res.render("category");
};

const singleArticle = async (req, res) => {
  res.render("single");
};

const search = async (req, res) => {
  res.render("search");
};

const author = async (req, res) => {
  res.render("author");
};

const addComment = async (req, res) => {};

export default {
  index,
  articleByCategories,
  singleArticle,
  search,
  author,
  addComment,
};
