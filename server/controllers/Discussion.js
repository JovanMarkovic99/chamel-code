const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const protected = require("../middleware/Protected");
const moderatorProtected = require("../middleware/ModeratorProtected");
const Category = require("../models/Category");
const Discussion = require("../models/Discussion");
const User = require("../models/User");

router.post("/create", protected, async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.content)
            return res.status(400).send({ message: "A discussion must have a title and content" });

        if (req.body.tags.length < 1 || req.body.tags.length > 7)
            return res.status(400).send({ message: "The number of tags must be between 1 and 7" });

        if (!mongoose.Types.ObjectId.isValid(req.body.categoryId))
            return res.status(400).send({ message: "Bad category id" });

        const category = await Category.findById(req.body.categoryId);
        if (!category) 
            return res.status(400).send({ message: "Category does not exist" });

        const discussion = Discussion({
            title: req.body.title,
            content: req.body.content,
            categoryId: req.body.categoryId,
            username: req.user.username,
            tags: req.body.tags,
        });

        await discussion.save();
        res.send(discussion);

        await User.findOneAndUpdate({ _id: req.user._id }, { $inc: { reputation: 10 }});
    } catch (err) {
        next(err);
    }
})

router.post("/delete", moderatorProtected, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.discussionId))
            return res.sendStatus(400);

        const discussion = await Discussion.findById(req.body.discussionId);
        if (!discussion || discussion.deleted)
            return res.sendStatus(400);

        discussion.deleted = true;
        await discussion.save();
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.sendStatus(400);

        const discussions = await Discussion.find({ categoryId: req.params.id, deleted: false })
        res.send(discussions);
    } catch (err) {
        next(err);
    }
});

router.get("/findById/:id", async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.sendStatus(400);

        const discussion = await Discussion.findById(req.params.id);
        if (!discussion || discussion.deleted)
            return res.sendStatus(404);

        res.send(discussion);
    } catch (err) {
        next(err);
    }
});

module.exports = router;