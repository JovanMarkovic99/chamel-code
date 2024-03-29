const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionLikesSchema = new Schema({
    username: String,
    like: {
        type: Number,
        min: -1,
        max: 1
    },
    discussionId: {
        type: mongoose.ObjectId,
        ref: 'Discussion'
    }
});

const DiscussionLikes = mongoose.model("DiscussionLikes", DiscussionLikesSchema);
module.exports = DiscussionLikes;