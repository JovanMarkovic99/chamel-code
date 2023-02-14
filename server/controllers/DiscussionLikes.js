const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const cache = require("../middleware/Cache")
const DiscussionLikes = require("../models/DiscussionLikes");
const Discussion = require("../models/Discussion");
const User = require("../models/User");

router.post("/:id", protected, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: "Bad discussion id" });

        if (req.body.like < -1 || req.body.like > 1)
            return res.status(400).send({ message: "Bad like number" });

        const discussion = await Discussion.findById(req.params.id);
        if (!discussion || discussion.deleted)
            return res.status(400).send({ message: "The discussion is not found" });
        
        const doc = (req.body.like == 0) ? 
                await DiscussionLikes.findOneAndDelete({ discussionId: req.params.id, username: req.user.username }) : 
                await DiscussionLikes.findOneAndUpdate({ discussionId: req.params.id, username: req.user.username }, { like: req.body.like }, { upsert: true });
        res.sendStatus(200);

        const delta = req.body.like - (doc ? doc.like : 0)
        await Discussion.findOneAndUpdate({ _id: discussion._id }, { $inc: { numLikes: delta }});
        await User.findOneAndUpdate({ username: discussion.username }, { $inc: { reputation: delta }});
    } catch (err) {
        next(err);
    }
});

router.get("/", protected, cache(2 * 60), async (req, res, next) => {
    try {
        const likes = await DiscussionLikes.find({ username: req.user.username }); 
        res.send(likes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;