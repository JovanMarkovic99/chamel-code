const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "./resources/img/"
});
const upload = multer({
    storage: storage
}).single("file");

const protected = require("../middleware/Protected");
const User = require("../models/User");

router.get("/init", async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user)
        return res.sendStatus(404);

    res.send({ _id: user._id, username: user.username, email: user.email, reputation: user.reputation, role: user.role, imagePath: user.imagePath });
});

router.get("/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
        return res.sendStatus(404);
    }

    res.send({ username: user.username, reputation: user.reputation, role: user.role, imagePath: user.imagePath });
});

router.get("/image/:urlImage", async (req, res) => {
    res.sendFile(path.join(__dirname, "../resources/img/", req.params.urlImage));
});

router.post("/register", async (req, res) => {
    if (!req.body.password) {
        return res.sendStatus(400).send({
            message: "Invalid password"
        });
    }

    if (req.body.username.toLowerCase().includes("chameleon")) {
        return res.status(400).send({
            message: "Username must not have the word 'Chameleon' in its name"
        });
    }

    let regex = /[a-zA-Z0-9_-]+$/;
    if (!regex.test(req.body.username)) {
        return res.status(400).send({
            message: "Username can only contain a-z A-Z 0-9 _ -"
        });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send({
            message: "User with this email already exist"
        });
    }

    const _user = await User.findOne({ username: req.body.username });

    if (_user) {
        return res.status(400).send({
            message: "User with this username already exists"
        });
    }

    const newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user"
    });

    await newUser.save();

    res.sendStatus(201);
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(400).send({
            message: "User with this username does not exist"
        });
    }

    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsEqual) {
        return res.status(401).send({
            message: "Wrong password"
        });
    }

    // TODO: Add key on production build
    const token = jwt.sign({ userId: user._id }, "123");

    res.send({ user, token });
});

router.post("/upload", protected, upload, async (req, res) => {
    if (!req.file)
        return res.sendStatus(400);

    if (req.file.size > 1000000) {
        fs.unlink(req.file.path, err => { if (err) console.log(err); });
        return res.sendStatus(400);
    }

    const user = await User.findById(req.userId);

    if (!user) {
        fs.unlink(req.file.path, err => { if (err) console.log(err); });
        return res.sendStatus(400);
    }

    if (req.file.mimetype === "image/png") {
        if (user.imagePath.length) {
            fs.unlink("./resources/img/" + user.imagePath, err => { if (err) console.log(err); });
        }
        user.imagePath = req.file.filename;
        user.save();
        
        res.sendStatus(200);
    } else {
        res.status(400).send({
            message: "The picture must be a png file"
        });
        
        fs.unlink(req.file.path, err => { if (err) console.log(err); });
    }
});

router.post("/changePassword", protected, async (req, res) => {
    if (!req.body.newPassword) {
        return res.sendStatus(400).send({
            message: "Invalid new password"
        });
    }

    const user = await User.findById(req.userId);

    if (!user)
        return res.sendStatus(401);

    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsEqual) {
        return res.sendStatus(401).send({
            message: "Wrong password"
        });
    }
    
    res.sendStatus(200);

    user.password = req.body.newPassword;
    user.save();
});

module.exports = router;