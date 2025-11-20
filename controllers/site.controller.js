import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";
import settingsModel from "../models/Settings.model.js"

// Site Controllers Functions
const index = async (req, res) => {
  const news = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  
  const ctategoriesInNews = await newsModel.distinct('category')
  const categories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })
  const settings = await settingsModel.findOne()
  const latestNews = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort(({ createdAt: -1 })).limit(3)

  res.render("index", { news, categories, latestNews, settings });
};

const articleByCategories = async (req, res) => {
  const category = await categoriesModel.findOne({ slug: req.params.name })
  if (!category) {
    return res.status(404).send('Category not found.');
  }

  const news = await newsModel.find({ category: category._id }).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const categories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })
  const latestNews = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort(({ createdAt: -1 })).limit(3)

  res.render("category", { news, categories, category, latestNews });
};

const singleArticle = async (req, res) => {
  const singleNews = await newsModel.findById(req.params.id).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const categories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })
  const latestNews = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort(({ createdAt: -1 })).limit(3)

  res.render("single", { singleNews, categories, latestNews });
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
  const categories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })
  const latestNews = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort(({ createdAt: -1 })).limit(3)

  res.render("search", { news, categories, searchQuery, latestNews });
};

const author = async (req, res) => {
  const author = await userModel.findOne({ _id: req.params.id })
  if (!author) {
    return res.status(404).send('Author Not found');
  }

  const news = await newsModel.find({ author: req.params.id }).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const ctategoriesInNews = await newsModel.distinct('category')
  const categories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })
  const latestNews = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort(({ createdAt: -1 })).limit(3)

  res.render("author", { news, categories, author, latestNews });
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
