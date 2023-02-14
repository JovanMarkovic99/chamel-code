const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const moderatorProtected = require("../middleware/ModeratorProtected");
const cache = require("../middleware/Cache")
const Discussion = require("../models/Discussion");
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/create", protected, async (req, res, next) => {
    try {
        if (!req.body.content)
            return res.status(400).send({ message: "A post must have content" });

        if (!mongoose.Types.ObjectId.isValid(req.body.discussionId))
            return res.status(400).send({ message: "Bad discussion id" });

        const discussion = await Discussion.findById(req.body.discussionId);
        if (!discussion || discussion.deleted)
            return res.status(400).send({ message: "The discussion is not found" });

        const post = Post({
            content: req.body.content,
            discussionId: req.body.discussionId,
            username: req.user.username
        });
        await post.save();
        res.send(post);

        await Discussion.findOneAndUpdate({ _id: discussion._id }, { $inc: { numPosts: 1 }});
        await User.findOneAndUpdate({ _id: req.user._id }, { $inc: { reputation: 5 }});
    } catch (err) {
        next(err);
    }
})

router.post("/delete", moderatorProtected, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.postId))
            return res.sendStatus(400);

        const post = await Post.findById(req.body.postId);
        if (!post || post.deleted)
            return res.sendStatus(400);

        post.deleted = true;
        await post.save();
        res.sendStatus(200);

        await Discussion.findOneAndUpdate({ _id: post.discussionId }, { $inc: { numPosts: -1 }});
    } catch (err) {
        next(err);
    }
})

router.get("/:id", cache(5 * 60), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.sendStatus(400);

        const post = await Post.find({ discussionId: req.params.id, deleted: false })
        res.send(post);
    } catch (err) {
        next(err);
    }
});

router.get("/findById/:id", cache(30 * 60), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.sendStatus(400);

        const post = await Post.findById(req.params.id);
        if (!post || post.deleted)
            return res.sendStatus(404);

        res.send(post);
    } catch (err) {
        next(err);
    }
});

module.exports = router;