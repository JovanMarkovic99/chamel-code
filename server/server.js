const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const auth = require("./middleware/Auth");
const error_handler = require("./middleware/ErrorHandler");

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
mongoose.set("useFindAndModify", false);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);
app.use(error_handler);

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use("/api/user", require("./controllers/User"));
app.use("/api/category", require("./controllers/Category"));
app.use("/api/discussion", require("./controllers/Discussion"));
app.use("/api/likes/discussion", require("./controllers/DiscussionLikes"));
app.use("/api/post", require("./controllers/Post"));
app.use("/api/likes/post", require("./controllers/PostLikes"));
app.use("/api/search", require("./controllers/Search"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
});

app.listen(5000, () => console.log("Server started on port 5000"));