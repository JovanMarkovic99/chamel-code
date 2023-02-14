const jwt = require("jsonwebtoken");

const cache = new Map();

module.exports = async (req, res, next) => {
    const [prefix, token] = req.headers.authorization.split(' ');
    if (!token) {
        req.user = null;
        return next();
    }

    const cachedUser = cache.get(token);
    if (cachedUser) {
        req.user = cachedUser.user;
        return next();
    }

    try {
        const user = jwt.verify(token, "123");
        cache.set(token, { user }, 60 * 60 * 1000);
        req.user = user;
    } catch (e) {
        req.user = null;
    }
    
    next();
};