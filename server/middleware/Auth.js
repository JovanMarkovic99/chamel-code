const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const tokenAuth = req.headers.authorization;

    try {
        const token = tokenAuth.split(" ")[1];
        const userData = jwt.verify(token, "123");
        req.userId = userData.userId;
    } catch(e) {
        req.userId = null;
    }
    
    next();
};