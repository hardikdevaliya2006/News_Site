import userModel from "../models/User.model.js";

// User CRUD Controllers Functions
const allUser = async (req, res) => {};
const addUserPage = async (req, res) => {};
const addUser = async (req, res) => {};
const updateUserPage = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

// Login Controllers Functions
const loginPage = async (req, res) => {};
const adminLogin = async (req, res) => {};
const logout = async (req, res) => {};

export {
  loginPage,
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
};