import userModel from "../models/User.model.js";
import newsModel from "../models/News.model.js";
import categoryModel from "../models/Category.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs"
import settingModel from "../models/Settings.model.js";
import createError from "../utils/error-message.js";
import { validationResult } from "express-validator";
dotenv.config();

// Login Controllers Functions
const loginPage = async (req, res) => {
  res.render("admin/login", { layout: false, error: 0 });
};

const adminLogin = async (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.render("admin/login", { layout: false, error: error.array() });
  }

  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return next(createError("User Not Found", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError("Invalid Username or Password", 404));
    }

    const jwtData = { id: user._id, fullname: user.fullname, role: user.role };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.redirect("/admin/dashboard");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/");
};

const dashBoard = async (req, res) => {
  let articleCount;
  if (req.role === "author") {
    articleCount = await newsModel.countDocuments({ author: req.id });
  } else {
    articleCount = await newsModel.countDocuments();
  }
  const userCount = await newsModel.countDocuments();
  const categoryCount = await categoryModel.countDocuments();

  res.render("admin/dashboard", {
    role: req.role,
    fullname: req.fullname,
    articleCount,
    userCount,
    categoryCount,
  });
};

const settings = async (req, res, next) => {
  try {
    const settings = await settingModel.findOne();
    res.render("admin/settings", { role: req.role, settings });
  } catch (error) {
    next(error);
  }
};

const saveSettings = async (req, res, next) => {
  const { website_title, footer_description } = req.body;
  const website_logo = req.file ? req.file.filename : null;

  try {
    let settings = await settingModel.findOne();
    if (!settings) {
      settings = new settingModel()
    }

    settings.website_title = website_title
    settings.footer_description = footer_description

    if (website_logo) {
      if (settings.website_logo) {
        const logoPath = `./public/uploads/${settings.website_logo}`
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath)
        }
      }
      settings.website_logo = website_logo
    }

    await settings.save()
    res.redirect("/admin/settings");
  } catch (error) {
    next(error);
  }
};

// User CRUD Controllers Functions
const allUser = async (req, res) => {
  const users = await userModel.find();
  res.render("admin/users", { users, role: req.role });
};

const addUserPage = async (req, res) => {
  res.render("admin/users/create", { role: req.role, error: 0 });
};

const addUser = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.render("admin/users/create", { role: req.role, error: error.array() });
  }
  await userModel.create(req.body);
  res.redirect("/admin/users");
};

const updateUserPage = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(createError("User Not Found", 404));
    }
    res.render("admin/users/update", { user, role: req.role, error: 0 });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;

  const error = validationResult(req)
  if (!error.isEmpty()) {
    const user = await userModel.findById(id);
    return res.render("admin/users/update", { user, role: req.role, error: error.array() });
  }

  const { fullname, password, role } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(createError("User Not Found", 404));
    }

    user.fullname = fullname || user.fullname;
    if (password) {
      user.password = password;
    }
    user.role = role || user.role;
    await user.save();
    res.redirect("/admin/users");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(createError("User Not Found", 404));
    }

    const article = await newsModel.findOne({ author: id })
    if (article) {
      return res.status(400).json({ success: false, message: 'Author Is Associated with Article' });
    }

    await user.deleteOne()
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  loginPage,
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  dashBoard,
  settings,
  saveSettings,
};
