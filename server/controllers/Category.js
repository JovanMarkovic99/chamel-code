const express = require("express");
const router = express.Router();
const cache = require("../middleware/Cache")
const Category = require("../models/Category");

router.post("/create", async (req, res, next) => {
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

router.get("/", cache(60 * 60), async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (err) {
        next(err);
    }
});

module.exports = router;