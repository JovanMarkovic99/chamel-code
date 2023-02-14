const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const PostLikes = require("../models/PostLikes");
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/:id", protected, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: "Bad post id" });

        if (req.body.like < -1 || req.body.like > 1)
            return res.status(400).send({ message: "Bad like number" });

        const user = await User.findById(req.userId);

        const post = await Post.findById(req.params.id);
        if (!post || post.deleted)
            return res.status(400).send({ message: "The post is not found" });
        
        const doc = (req.body.like == 0) ?
                await PostLikes.findOneAndDelete({ postId: req.params.id, username: user.username }) :
                await PostLikes.findOneAndUpdate({ postId: req.params.id, username: user.username }, { like: req.body.like }, { upsert: true });
        res.sendStatus(200);

        const delta = req.body.like - (doc ? doc.like : 0);
        await Post.findOneAndUpdate({ _id: post._id }, { $inc: { numLikes: delta }});
        await User.findOneAndUpdate({ username: post.username }, { $inc: { reputation: delta }});
    } catch (err) {
        next(err);
    }
});

router.get("/", protected, async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        const likes = await PostLikes.find({ username: user.username });

        res.send(likes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;