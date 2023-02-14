
const client = require("../utils/Redis")

module.exports = (duration) => {
    return async (req, res, next) => {
        if (!client.connected)
            return next();

        const key = req.originalUrl + JSON.stringify(req.body);
        client.get(key, (err, reply) => {
            if (reply)
                return res.send(JSON.parse(reply));

            res.sendResponse = res.send;
            res.send = (body) => {
                client.set(key, body, "EX", duration);
                res.sendResponse(body);
            };
            next();
        });
    }
};