import mongoose from "mongoose";
import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";
import commentModel from "../models/Comment.model.js";

// Site Controllers Functions
const index = async (req, res) => {};
const articleByCategories = async (req, res) => {};
const search = async (req, res) => {};
const author = async (req, res) => {};
const addComment = async (req, res) => {};

export default {
  index,
  articleByCategories,
  search,
  author,
  addComment,
};