const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: String,
    discussionId: {
        type: mongoose.ObjectId,
        ref: 'Discussion'
    },
    username: String,
    deleted: {
        default: false,
        type: Boolean
    },
    numLikes: {
        default: 0,
        type: Number
    }},
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;