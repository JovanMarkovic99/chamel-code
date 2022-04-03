const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Discussion = require("../models/Discussion");
const Post = require("../models/Post");

router.get("/discussions", async (req, res) => {
    if (!req.query.username)
        return res.sendStatus(401);

    const discussions = await Discussion.find({ username: req.query.username, deleted: false });
    res.send(discussions);
});

router.get("/posts", async (req, res) => {
    if (!req.query.username)
        return res.sendStatus(401);

    const posts = await Post.find({ username: req.query.username, deleted: false });
    res.send(posts);
});

router.get("/querry", async(req, res) => {
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
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;