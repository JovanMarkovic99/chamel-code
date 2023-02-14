const User = require("../models/User");

module.exports = async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") 
        return res.sendStatus(401);
    
    next();
};