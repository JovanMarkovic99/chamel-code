const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    title: String,
    content: String,
    categoryId: { 
        type: mongoose.ObjectId,
        ref:  'Category'
    },
    username: String,
    deleted: {
        default: false,
        type: Boolean
    },
    numLikes: {
        default: 0,
        type: Number
    },
    numPosts: {
        default: 0,
        type: Number
    },
    tags: {
        default: [],
        type: [
            {
                type: String,
                lowercase: true
            }
        ]
    }}, 
    { timestamps: true }
);

const Discussion = mongoose.model("Discussion", DiscussionSchema);
module.exports = Discussion;