const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { json } = require("express");
const verify = require("../verify");
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

router.get("/", async (req, res) => {
  //sprint 2:consult the list of jobbers
  try {
    const token = req.headers["x-access-token"];
    decoded = jwt.verify(token, "secret123");
    user = await User.find({ email: decoded.email }, {});
    if (ver.authorised(user[0].enum[0]) != "2") {
      return res.json({
        message: "only jobbers are allowed to view jobseekers",
      });
    }
    list = await User.find(
      { enum: ["jobSeeker"] },
      { email: 0, password: 0, _id: 0, __v: 0 }
    );
    return res.json({ list });
  } catch (err) {
    return res.json({ status: err, error: "unauthorised access" });
  }
});

router.post("/register", async (req, res) => {
  try {
    //create account finished(both admin and users)
    const newPassword = await bcrypt.hash(req.body.password, 10);
    if (!ver.verifyauth(req.body.enum)) {
      return res.json({ status: "error", error: "invalid enum" });
    }

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      enum: req.body.enum,
      quote: req.body.quote,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  //login account and give token both finished for users and admins
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    //if the user is empty(user not found in db)
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  ); //compares password

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      }, //returns token
      "secret123"
    );
    return res.json({ user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.put("/quote", async (req, res) => {
  //checks token and display quote
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    let user = await User.findOneAndUpdate(
      { email: email },
      { quote: req.body.quote }
    );
    if (!user) {
      res.send({ err: "user doesnt exist" });
    }
    return res.json({ status: "ok", quote: req.body.quote });
  } catch (error) {
    return res.json({ status: error, error: "invalid token" });
  }
});

router.delete("/quote", async (req, res) => {
  //user can remove his quote using his own token

  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    const user = await User.updateOne({ email: decoded.email }, { quote: "" });
    return res.json({ status: "ok", message: "quote deleted" });
  } catch (error) {
    return res.json({ status: error, message: "unauthorized access" });
  }
});
module.exports = router;
