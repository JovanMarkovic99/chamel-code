const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    reputation: {
        default: 0,
        type: Number
    },
    imagePath: {
        default: "",
        type: String
    },
    role: String
    }, { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;