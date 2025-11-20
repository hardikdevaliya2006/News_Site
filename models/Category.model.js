import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
},
  { timestamps: true }
);

categorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;