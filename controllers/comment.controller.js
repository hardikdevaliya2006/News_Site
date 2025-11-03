import commentModel from "../models/Comment.model.js";

// Comments Controller Functions
const allComments = async (req, res) => {
    res.render("admin/comments")
};

export default { allComments };