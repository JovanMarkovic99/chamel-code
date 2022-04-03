const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const moderatorProtected = require("../middleware/ModeratorProtected");
const Discussion = require("../models/Discussion");
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/create", protected, async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.sendStatus(401);
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.discussionId)) {
        return res.status(400).send({
            message: "Bad discussion id"
        });
    }

    const discussion = await Discussion.findById(req.body.discussionId);

    if (!discussion) {
        return res.status(400).send({
            message: "Discussion does not exist"
        });
    }

    const post = Post({
        content: req.body.content,
        discussionId: req.body.discussionId,
        username: user.username
    });
    await post.save();

    res.send(post);

    Discussion.findOneAndUpdate({ _id: discussion._id }, { $inc: { numPosts: 1 }}, { new: true }, (error, doc) => {});
    User.findOneAndUpdate({ _id: user._id }, { $inc: { reputation: 5 }}, { new: true }, (error, doc) => {});
})

router.post("/delete", moderatorProtected, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.postId)) {
        return res.sendStatus(404);
    }

    const post = await Post.findById(req.body.postId);

    if (!post) {
        return res.sendStatus(404);
    }

    post.deleted = true;
    await post.save();
    res.sendStatus(200);

    Discussion.findOneAndUpdate({ _id: post.discussionId }, { $inc: { numPosts: -1 }}, { new: true }, (error, doc) => {});
})

router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const post = await Post.find({ discussionId: req.params.id, deleted: false })
    res.send(post);
});

router.get("/findById/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const post = await Post.findOne({ _id: req.params.id, deleted: false });
    res.send(post);
});

module.exports = router;