import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";


// Site Controllers Functions
const index = async (req, res) => {
  const news = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const ctategories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })

  res.render("index", { news, ctategories });
};

const articleByCategories = async (req, res) => {
  const category = await categoriesModel.findOne({ slug: req.params.name })
  if (!category) {
    return res.status(404).send('Category not found.');
  }

  const news = await newsModel.find({ category: category._id }).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const ctategories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })

  res.render("category", { news, ctategories, category });
};

const singleArticle = async (req, res) => {
  const singleNews = await newsModel.findById(req.params.id).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const ctategories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })

  res.render("single", { singleNews, ctategories });
};

const search = async (req, res) => {
  const searchQuery = req.query.search

  const news = await newsModel.find(
    {
      $or:
        [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } }
        ]
    }
  )
    .populate('category', { 'name': 1, 'slug': 1 })
    .populate('author', 'fullname')
    .sort({ createdAt: -1 })

  const ctategoriesInNews = await newsModel.distinct('category')
  const ctategories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })

  res.render("search", { news, ctategories, searchQuery });
};

const author = async (req, res) => {
  const author = await userModel.findOne({ _id: req.params.id })
  if (!author) {
    return res.status(404).send('Author Not found');
  }

  const news = await newsModel.find({ author: req.params.id }).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const ctategories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })

  res.render("author", { news, ctategories, author });
};

const addComment = async (req, res) => { };

export default {
  index,
  articleByCategories,
  singleArticle,
  search,
  author,
  addComment,
};
