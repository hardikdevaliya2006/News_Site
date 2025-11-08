import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  image: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

newsSchema.plugin(mongoosePaginate);

const News = mongoose.model("News", newsSchema);

export default News;
