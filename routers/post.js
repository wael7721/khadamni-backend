const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { json } = require("express");
const ver = require("../verify");
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const { populate } = require("../models/user.model");

const router = express.Router();
router.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/khademnitn", function (err, db) {
  if (err) {
    throw err;
  }
  console.log("db connected from user file");
});
router.post("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    let user = await User.find({ email: decoded.email });

    if (!user) {
      return res.json({ message: "user not found" });
    }
    if (ver.typeofuser(user[0].enum[0]) == "jobseeker") {
      return res.json({ message: "job seekers arent allowed to post" });
    }
    await Post.create({
      jobberid: user[0].id,
      title: req.body.title,
      description: req.body.description,
    });
    return res.json({ status: "ok", message: "done" });
  } catch (error) {
    return res.json({ status: error, message: "unauthorized" });
  }
});
router.get("/", async (req, res) => {
  //views posts

  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    let user = await User.find({ email: decoded.email });
    if (!user) {
      //user not found in database
      return res.json({ status: 401, message: "not logged in" });
    }
    //user is logged in then

    //find posts
    let posts = await Post.find(
      {},
      { _id: 1, title: 1, description: 1, dateofpost: 1, jobberid: 1 }
    ).populate("jobberid", { name: 1, _id: 0 });
    if (!posts) {
      //no posts in db
      return res.json({ error: "no posts found" });
    }
    //successfully found posts,populate is used to add the name of user who posted the service

    return res.json(posts);
  } catch (err) {
    return res.json({ status: err });
  }
});
router.delete("/", async (req, res) => {
  //when giving the id name it to id
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    let user = await User.find({ email: decoded.email });
    if (!user) {
      return res.json({ error: 401 });
    } //this line should be removed its here for testing
    let post = await Post.find({ _id: req.body.id });
    if (!post) {
      return res.json({ message: "post not found" });
    }
    if (post.jobberid != user._id && user.enum != "admin") {
      return res.json({ status: 401 });
    } //not admin or original poster
    await Post.deleteOne({ _id: req.body.id });
    return res.json({ message: "deleted post successfully" });
  } catch (err) {
    return res.json({ message: err });
  }
});
router.patch("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    const user = await User.find({ email: decoded.email });

    if (!user) {
      return res.json({ message: "user not found" });
    }
    let post = await Post.find({ _id: req.body.id }); //searches for the post using its id
    if (!post) {
      return res.json({ message: "post not found" });
    }

    if (post.jobberid != user._id && user.enum != "0") {
      return res.json({ status: 401 });
    }
    await Post.updateOne(
      { _id: req.body.postid },
      { title: req.body.title, description: req.body.description }
    );
    return res.json({ message: "modified post" });
  } catch (error) {
    return res.json({ status: error, message: "unauthorized access" });
  }
}); //edit post
