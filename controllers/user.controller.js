import userModel from "../models/User.model.js";

// Login Controllers Functions
const loginPage = async (req, res) => {
  res.render("admin/login", { layout: false });
};

const adminLogin = async (req, res) => {};

const logout = async (req, res) => {};

// User CRUD Controllers Functions
const allUser = async (req, res) => {
  const users = await userModel.find()
  res.render("admin/users", {users});
};

const addUserPage = async (req, res) => {
  res.render("admin/users/create");
};

const addUser = async (req, res) => {
  await userModel.create(req.body);
  res.redirect("/admin/users");
};

const updateUserPage = async (req, res) => {
  res.render("admin/users/update");
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

const dashBoard = async (req, res) => {
  res.render("admin/dashboard");
};

const settings = async (req, res) => {
  res.render("admin/settings");
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
};
