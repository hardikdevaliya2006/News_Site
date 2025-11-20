import commentModel from "../models/Comment.model.js";
import newsModel from "../models/News.model.js";
import createError from "../utils/error-message.js"

// Comments Controller Functions
const allComments = async (req, res) => {
  try {
    let comment;

    if (req.role === 'admin') {
      comment = await commentModel.find().populate('article', 'title').sort({ cereatedAt: -1 })
    } else {
      const news = await newsModel.find({ author: req.id })
      const newsId = news.map((id) => id._id)
      comment = await commentModel.find({ article: { $in: newsId } }).populate('article', 'title').sort({ cereatedAt: -1 })
    }

    res.render("admin/comments", { role: req.role, comment })
  } catch (error) {
    next(createError('Error While Fetching Comment', 500))
  }
};

const updateCommentStatus = async (req, res) => {
  res.render("admin/comments", { role: req.role });
};

const deleteComment = async (req, res) => {
  res.render("admin/comments", { role: req.role });
};

export default { allComments, updateCommentStatus, deleteComment };
