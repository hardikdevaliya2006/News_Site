import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;