const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); 
const { json } = require("express");

const router = express.Router()
router.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/khademnitn", function (err, db) {
  if (err) {
    throw err;
  }
  console.log("db connected from user file");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.get("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
router.get("/find", async (req, res) => {
  try {
    await User.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result.name);
      }
    });
  } catch (error) {
    res.json({ status: "error", error: "could not load users" });
  }
});

module.exports = router;
