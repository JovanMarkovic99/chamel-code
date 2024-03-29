const User = require("../models/User");

module.exports = async (req, res, next) => {
    if (!req.user)
        return res.sendStatus(401);

    next();
};