import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import userModel from "../models/User.model.js";
import paginateData from "../utils/paginateData.js";
import commentModel from "../models/Comment.model.js";

// Site Controllers Functions
const index = async (req, res) => {
  const paginateNews = await paginateData(newsModel,
    {},
    req.query,
    {
      populate: [
        { path: 'category', select: 'name slug' },
        { path: 'author', select: 'fullname' }
      ],
      sort: '-createdAt'
    }
  )

  res.render("index", { paginateNews, qurey: req.query });
};

const articleByCategories = async (req, res) => {
  const category = await categoriesModel.findOne({ slug: req.params.name })
  if (!category) {
    return res.status(404).send('Category not found.');
  }

  const paginateNews = await paginateData(newsModel,
    { category: category._id },
    req.query,
    {
      populate: [
        { path: 'category', select: 'name slug' },
        { path: 'author', select: 'fullname' }
      ],
      sort: '-createdAt'
    }
  )

  res.render("category", { paginateNews, category, qurey: req.query });
};

const singleArticle = async (req, res) => {
  const singleNews = await newsModel.findById(req.params.id).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort({ createdAt: -1 })
  const comment = await commentModel.find({ article: req.params.id, status: "approved" }).sort('-createdAt')

  // res.send (comment)
  res.render("single", { singleNews, comment });
};

const search = async (req, res) => {
  const searchQuery = req.query.search

  const paginateNews = await paginateData(newsModel,
    {
      $or:
        [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } }
        ]
    },
    req.query,
    {
      populate: [
        { path: 'category', select: 'name slug' },
        { path: 'author', select: 'fullname' }
      ],
      sort: '-createdAt'
    }
  )

  res.render("search", { paginateNews, searchQuery, qurey: req.query });
};

const author = async (req, res) => {
  const author = await userModel.findOne({ _id: req.params.id })
  if (!author) {
    return res.status(404).send('Author Not found');
  }

  const paginateNews = await paginateData(newsModel,
    { author: req.params.id },
    req.query,
    {
      populate: [
        { path: 'category', select: 'name slug' },
        { path: 'author', select: 'fullname' }
      ],
      sort: '-createdAt'
    }
  )

  res.render("author", { paginateNews, author, qurey: req.query });
};

const addComment = async (req, res) => {
  try {
    const { name, email, content } = req.body
    const comment = await new commentModel({ name, email, content, article: req.params.id })
    await comment.save()
    res.redirect(`/single/${req.params.id}`);
  } catch (error) {
    res.send(500).send('Error adding comment');
  }
};

export default {
  index,
  articleByCategories,
  singleArticle,
  search,
  author,
  addComment,
};
