import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "News",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    require: true,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments