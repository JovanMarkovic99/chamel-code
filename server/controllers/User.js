const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const protected = require("../middleware/Protected");
const User = require("../models/User");

const UserImage = require("../models/UserImage")
const fs = require("fs");
const sharp = require("sharp");
const multer = require("multer");
const upload = multer({
    dest: "uploads/"
});

router.get("/init", async (req, res) => {
    if (!req.userId)
        return res.sendStatus(400);

    const user = await User.findById(req.userId);
    if (!user)
        return res.sendStatus(404);

    res.send({ _id: user._id, username: user.username, email: user.email, reputation: user.reputation, role: user.role, imageId: user.imageId});
});

router.get("/:username", async (req, res) => {
    if (req.params.username === "undefined" || !req.params.username)
        return res.sendStatus(400);

    const user = await User.findOne({ username: req.params.username });
    if (!user)
        return res.sendStatus(404);

    res.send({ username: user.username, reputation: user.reputation, role: user.role, imageId: user.imageId });
});

router.get("/image/:imageId", async (req, res) => {
    if (req.params.imageId === "undefined" || req.params.imageId === "null")
        return res.sendStatus(400);

    const userImage = await UserImage.findById(req.params.imageId);
    if (!userImage)
        return res.sendStatus(404);
    
    res.send(userImage.data);
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

router.post("/upload", protected, upload.single("userImage"), async (req, res) => {
    const buffer = await sharp(req.file.path)
                        .resize({ width: 250, height: 250 })
                        .png()
                        .toBuffer();
    
    const user = await User.findById(req.userId);
    if (user.imageId) {
        const existingUserImage = await UserImage.findById(user.imageId);
        if (!existingUserImage)
            return res.sendStatus(500);
            
        existingUserImage.data = buffer;
        await existingUserImage.save();

        fs.unlinkSync(req.file.path);
        return res.sendStatus(200);
    }

    const newUserImage = UserImage({ data: buffer });
    await newUserImage.save();

    user.imageId = newUserImage._id;
    await user.save();

    fs.unlinkSync(req.file.path);
    res.sendStatus(200);
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