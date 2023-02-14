const User = require("../models/User");

module.exports = async (req, res, next) => {
    if (!req.userId)
        return res.sendStatus(401);

    const user = await User.findById(req.userId);
    if (!user) 
        return res.sendStatus(401);

    next();
};