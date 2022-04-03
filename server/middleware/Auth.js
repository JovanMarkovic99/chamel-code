const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const tokenAuth = req.headers.authorization;

    try {
        if (tokenAuth) {
            const token = tokenAuth.split(" ")[1];
            if (token) {
                // TODO: Add key on production build
                const userData = jwt.verify(token, "123");
                req.userId = userData.userId;
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    } catch(e) {
        req.userId = null;
        next();
    }
};