const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");  
const Post = require("./models/post.model");
const jwt = require("jsonwebtoken");

const { json } = require("express");
const time = require("./time");

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/khademnitn", function (err, db) {
  if (err) {
    throw err;
  }
  console.log("db connected from index file");
});

app.use('/api/user',require('./route/user'))






app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/service", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const name = decoded.name;
    date = time();
    await Post.create({
      name: name,
      title: req.body.title,
      description: req.body.description,
      dateofpost: time,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.get("/api/service", async (req, res) => {
  Post.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});


