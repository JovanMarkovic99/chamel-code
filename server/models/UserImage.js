const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserImageSchema = new Schema({
    data: Buffer
});

const UserImage = mongoose.model("UserImage", UserImageSchema);
module.exports = UserImage;