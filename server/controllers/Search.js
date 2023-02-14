const express = require("express");
const router = express.Router();
const cache = require("../middleware/Cache");
const Discussion = require("../models/Discussion");
const Post = require("../models/Post");

router.get("/discussions", cache(15 * 60), async (req, res, next) => {
    try {
        if (!req.query.username)
            return res.sendStatus(400);

        const discussions = await Discussion.find({ username: req.query.username, deleted: false });
        res.send(discussions);
    } catch (err) {
        next(err);
    }
});

router.get("/posts", cache(10 * 60), async (req, res, next) => {
    try {
        if (!req.query.username)
            return res.sendStatus(400);

        const posts = await Post.find({ username: req.query.username, deleted: false });
        res.send(posts);
    } catch (err) {
        next(err);
    }
});

router.get("/querry", async(req, res, next) => {
    try {
        let querry = {};
        querry.deleted = false;

        if (req.query.username)
            querry.username = req.query.username;
        if (req.query.numLikes)
            querry.numLikes = { $gte: req.query.numLikes };
        
        let tags = JSON.parse(req.query.tags);
        if (tags && tags.length)
            querry.tags = { $in: tags };

        const discussions = await Discussion.find(querry);
        res.send(discussions);
    } catch (err) {
        next(err);
    }
});

module.exports = router;