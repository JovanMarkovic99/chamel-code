const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const DiscussionLikes = require("../models/DiscussionLikes");
const Discussion = require("../models/Discussion");
const User = require("../models/User");

router.post("/:id", protected, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(401);
    }

    if (req.body.like < -1 || req.body.like > 1)
        return res.sendStatus(401);

    const user = await User.findById(req.userId);

    if (!user) {
        return res.sendStatus(401);
    }

    const discussion = await Discussion.findOne({ _id: req.params.id })

    if (!discussion) {
        return res.sendStatus(404);
    }
    
    if (req.body.like === 0) {
        const doc = await DiscussionLikes.findOneAndDelete({ discussionId: req.params.id, username: user.username });
        res.sendStatus(200);

        if (doc) {
            Discussion.findOneAndUpdate({ _id: discussion._id }, { $inc: { numLikes: -doc.like }}, { new: true }, (error, doc) => {});
            User.findOneAndUpdate({ username: discussion.username }, { $inc: { reputation: -doc.like }}, { new: true }, (error, doc) => {});
        }
    }   
    else {
        const doc = await DiscussionLikes.findOneAndUpdate({ discussionId: req.params.id, username: user.username }, { like: req.body.like }, { upsert: true });
        res.sendStatus(200);

        if (!doc) {
            Discussion.findOneAndUpdate({ _id: discussion._id }, { $inc: { numLikes: req.body.like }}, { new: true }, (error, doc) => {});
            User.findOneAndUpdate({ username: discussion.username }, { $inc: { reputation: req.body.like }}, { new: true }, (error, doc) => {});
        }
        else if (req.body.like !=  doc.like) {
            Discussion.findOneAndUpdate({ _id: discussion._id }, { $inc: { numLikes: req.body.like - doc.like }}, { new: true }, (error, doc) => {});
            User.findOneAndUpdate({ username: discussion.username }, { $inc: { reputation: req.body.like - doc.like }}, { new: true }, (error, doc) => {});
        }
    }
});

router.get("/", protected, async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.sendStatus(401);
    }

    const likes = await DiscussionLikes.find({ username: user.username });
    res.send(likes);
});

module.exports = router;