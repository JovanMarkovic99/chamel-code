const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const adminProtected = require("../middleware/AdminProtected");
const Category = require("../models/Category");

router.post("/create", adminProtected, async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.description)
            return res.sendStatus(400);

        const category = Category({
            title: req.body.title,
            description: req.body.description
        });

        await category.save();
        res.send(category);
    } catch (err) {
        next(err);
    }
})

router.get("/", async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.sendStatus(400);

        const category = await Category.findById(req.params.id);
        if (!category)
            return res.sendStatus(404);

        res.send(category);
    } catch (err) {
        next(err);
    }
});

module.exports = router;