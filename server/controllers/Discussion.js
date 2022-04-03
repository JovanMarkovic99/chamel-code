const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const moderatorProtected = require("../middleware/ModeratorProtected");
const Category = require("../models/Category");
const Discussion = require("../models/Discussion");
const User = require("../models/User");

router.post("/create", protected, async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.sendStatus(401);
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.categoryId)) {
        return res.status(400).send({
            message: "Bad category id"
        });
    }

    const category = await Category.findById(req.body.categoryId);

    if (!category) {
        return res.status(400).send({
            message: "Category does not exist"
        });
    }

    if (req.body.tags.length > 7) {
        return res.status(400).send({
            message: "Too many tags"
        });
    }

    const discussion = Discussion({
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
        username: user.username,
        tags: req.body.tags,
    });

    await discussion.save();
    res.send(discussion);

    User.findOneAndUpdate({ _id: user._id }, { $inc: { reputation: 10 }}, { new: true }, (error, doc) => {});
})

router.post("/delete", moderatorProtected, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.discussionId)) {
        return res.sendStatus(404);
    }

    const discussion = await Discussion.findById(req.body.discussionId);

    if (!discussion) {
        return res.sendStatus(404);
    }

    discussion.deleted = true;
    await discussion.save();
    res.sendStatus(200);
})

router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const discussions = await Discussion.find({ categoryId: req.params.id, deleted: false })
    res.send(discussions);
});

router.get("/findById/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const discussion = await Discussion.findOne({ _id: req.params.id, deleted: false });
    res.send(discussion);
});

module.exports = router;