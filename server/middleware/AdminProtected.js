const User = require("../models/User");

module.exports = async (req, res, next) => {
    if (!req.userId) {
        return res.sendStatus(401);
    } else {
        const user = await User.findById(req.userId);

        if (!user || user.role !== "admin") {
            return res.sendStatus(401);
        }
        
        next();
    }
};