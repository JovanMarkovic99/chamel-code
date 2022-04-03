const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const adminProtected = require("../middleware/AdminProtected");
const Category = require("../models/Category");

router.post("/create", adminProtected, async (req, res) => {
    const category = Category({
        title: req.body.title,
        description: req.body.description
    });

    await category.save();
    res.send(category);
})

router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const category = await Category.findById(req.params.id);
    res.send(category);
});

module.exports = router;