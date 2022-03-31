const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");
const Post = require("./models/post.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { json } = require("express");

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routers/user"));
app.use("/api/admin", require("./routers/admin"));
app.use("/api/application", require("./routers/application"));
app.use('/api/post', require("./routers/application"));

app.listen(1337, () => {
  console.log("Server started on 1337");
});
