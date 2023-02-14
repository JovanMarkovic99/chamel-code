
module.exports = async (err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(500);
};