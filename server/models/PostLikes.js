const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostLikesSchema = new Schema({
    username: String,
    like: {
        type: Number,
        min: -1,
        max: 1
    },
    postId: {
        type: mongoose.ObjectId,
        ref: 'Post'
    }   
});

const PostLikes = mongoose.model("PostLikes", PostLikesSchema);
module.exports = PostLikes;